---
title: "Cloudflare 521: 앱은 정상인데 Nginx가 기동하지 않았다"
date: 2026-10-03
tags: [case, operation, failure, mastodon]
status: growing
lang: ko
---

## 질문

업그레이드 후 Cloudflare 521이 보일 때 앱 컨테이너부터 고쳐야 하는가?

## 증상과 환경

공개 incident `SUP-0001`에는 Mastodon 업그레이드 후 웹 접속이 막히고 Cloudflare가 HTTP 521을 반환한 기록이 있다. 환경은 Ubuntu 24.04 LTS, Mastodon, Docker Compose, Nginx, Cloudflare다.

[원 incident 본문](https://github.com/thanksstevenkim/mastodon-lab/blob/15b99f151f4d022534ac65b172f8f2eeee54b084/incidents/001-cloudflare-521-after-upgrade.md)을 2026-10-03에 확인했다. 이하 해결·검증은 **당시 작성된 기록의 결과**이며 이번 작업에서 재현한 결과가 아니다.

## 확인한 상태와 로그 범위

기록에는 컨테이너 healthy, PostgreSQL 정상, Puma 실행 중이지만 외부 웹 접근 불가라고 적혀 있다. 조사 항목은 `docker compose ps`, Web·Puma·Elasticsearch 로그, DB 연결, `nginx -t`, `systemctl status nginx`다.

Nginx의 실제 오류 출력과 정확한 중복 설정 파일은 공개 incident에 없다. 따라서 `nginx: [emerg] ...` 같은 원본에 없는 로그를 만들어 넣지 않는다.

## 처음 세운 가설 / 틀렸던 가설

원 기록은 당시 가설의 순서를 명시하지 않는다. 아래는 상태로부터 **다음에 사용할 진단 비교**이며, 실제로 모두 시도했다는 회고가 아니다.

| 후보 | 기록과의 비교 |
| --- | --- |
| 앱 컨테이너 중단 | healthy·Puma 실행 기록과 맞지 않음 |
| DB 연결 장애 | PostgreSQL·연결 확인 기록과 맞지 않음 |
| 외부 요청을 받는 프록시 기동 실패 | Nginx 상태와 기록된 원인에 맞음 |

## 실제 원인

incident의 원인 설명은 업그레이드 후 유효하지 않은 구성 때문에 **Nginx가 시작하지 못했다**는 것이다. 앱이 정상이어도 Cloudflare에서 origin에 연결할 경계가 멈춰 있었다.

## 해결

기록된 순서는 Nginx 구성 검사 → 중복 구성 제거 → Nginx 재시작 → 서비스 복구 확인이다. 어느 파일의 어떤 지시어가 중복됐는지는 이 자료만으로 알 수 없다.

## 검증

원 기록은 Nginx 정상 실행, Cloudflare 경유 접근, Mastodon 웹 화면, 사용자 재접속을 확인했다고 적는다. 원시 모니터링·접속 로그는 포함하지 않는다. 여기서 독립적으로 확인한 것은 그 기록의 내용까지다.

## 재발 방지 / 다시 사용할 수 있는 질문

- `nginx -t` 결과는 정상인가?
- 구성 문법과 실제 서비스 기동 상태를 모두 확인했는가?
- 컨테이너가 정상이어도 외부 요청 경로의 프록시가 멈췄는가?
- origin 직접 접근과 Cloudflare 경유 접근을 따로 확인할 수 있는가?
- 변경 전 구성을 보관하고 수정한 파일을 특정했는가?
- 복구 확인이 프로세스 실행뿐 아니라 웹 작업까지 도달했는가?

## 일반화할 수 있는 교훈 / 한계

[장애 기록이 대응 절차가 되는 순간](/notes/incident-to-runbook/)에 추가한 기준은 **앱의 정상 상태가 전체 접속 경로의 정상을 보장하지 않는다**는 것이다. 이 사건에서 Nginx가 원인이었다고 모든 521의 원인을 Nginx 중복 설정으로 판정하지 않는다.

## 연결

- 개념: [장애 기록이 대응 절차가 되는 순간](/notes/incident-to-runbook/)
- 비교: [Elasticsearch 서비스명 불일치](/notes/case-elasticsearch-service-name/)
