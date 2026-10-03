---
title: "Elasticsearch: 서비스명과 ES_HOST가 달랐다"
date: 2026-10-03
tags: [case, operation, failure, mastodon]
status: growing
lang: ko
---

## 질문

Elasticsearch가 실행 중인데 Sidekiq가 연결하지 못하면 어떤 설정을 비교해야 하는가?

## 증상과 환경

공개 incident `SUP-0002`에는 Mastodon 업그레이드 후 Sidekiq가 Elasticsearch에 연결하지 못하고 검색이 불가능해진 사례가 있다. 환경은 Ubuntu 24.04 LTS, Mastodon, Docker Compose, Elasticsearch, Sidekiq다.

[원 incident 본문](https://github.com/thanksstevenkim/mastodon-lab/blob/15b99f151f4d022534ac65b172f8f2eeee54b084/incidents/002-elasticsearch-service-name.md)을 2026-10-03에 읽었다. Mastodon의 정확한 대상 버전과 Compose 원본 전체는 이 문서에 없다.

## 확인한 로그와 설정

증상 항목의 오류 문구는 다음과 같다. 전체 stack trace가 아니다.

```text
Temporary failure in name resolution
```

조사에서는 컨테이너 상태, 최신 릴리스의 Compose 구성, Elasticsearch 설정, `ES_HOST`와 이름을 비교했다. 기록에 남은 변경은 다음과 같다.

```dotenv
# 이 incident의 변경 전
ES_HOST=elasticsearch
# 이 incident의 변경 후
ES_HOST=es
```

## 처음 세운 가설 / 틀렸던 가설

실제 가설의 순서는 원문에 없다. 오류가 이름 해석 실패였다는 점은 먼저 주소·서비스명·네트워크를 조사할 근거가 된다. 이를 인덱스 손상이나 검색 데이터 손실의 증거로 바꾸면 안 된다.

## 실제 원인

원 기록은 업그레이드 중 Elasticsearch 이름이 바뀌었지만 `ES_HOST`가 이전 이름을 계속 가리켰다고 설명한다. 실행 여부와 **소비자가 참조하는 주소의 일치**는 별도 확인 사항이었다.

## 해결

기존 Compose 파일 백업 → 새 Compose 구성 반영 → `ES_HOST`를 실제 이름에 맞게 변경 → 컨테이너 재생성 → Sidekiq 연결 검증이 원 기록의 순서다.

이 값은 해당 배포의 해결이다. 모든 Mastodon의 설정을 `es`로 바꿔야 한다는 런북이 아니다. 실제 서비스명·별칭·네트워크와 주입된 환경변수를 기준으로 판단한다.

## 검증

원 incident는 Elasticsearch 접근, Sidekiq 연결, 검색 복구와 연합 재개를 보고한다. 원시 연결 로그는 없다. 연합 중단의 전체 인과경로를 이 이름 불일치만으로 재구성하지 않는다. 이번 작업에서 장애나 검색을 재현하지 않았다.

## 재발 방지 / 다시 사용할 수 있는 질문

- 이름 해석 실패인가, 연결 거부인가, 인증 실패인가?
- Compose 서비스명과 네트워크 별칭은 무엇인가?
- 설정 파일 값과 실행 컨테이너에 주입된 `ES_HOST`가 같은가?
- Sidekiq가 있는 네트워크에서 그 이름이 해석되는가?
- 주소를 바꾼 뒤 연결·검색 작업 모두를 확인했는가?
- 업그레이드 diff에서 이름·포트·네트워크 변경을 검토했는가?

## 일반화할 수 있는 교훈 / 한계

[장애 기록이 대응 절차가 되는 순간](/notes/incident-to-runbook/)의 기준을 “서비스가 살아 있는가”에서 **“다른 서비스가 올바른 주소로 찾아가는가”**까지 넓힌다. 장애 기록만으로 현재 Mastodon의 공식 설정을 단정하지 않는다.

## 연결

- 개념: [장애 기록이 대응 절차가 되는 순간](/notes/incident-to-runbook/)
- 비교: [Cloudflare 521과 Nginx 기동 실패](/notes/case-cloudflare-521-nginx/)
