---
title: 장애 기록이 대응 절차가 되는 순간
date: 2026-10-03
tags: [concept, operation, failure, learning]
status: growing
lang: ko
---

## 질문

같은 “안 된다”는 증상에서 어떤 증거를 먼저 확인해야 문제 범위를 줄일 수 있는가?

## 출발점

Mastodon 운영 기록에는 서로 다른 경계에서 멈춘 사례가 있다. Cloudflare 521인데 앱 컨테이너는 정상인 사건, Elasticsearch가 실행 중이어도 Sidekiq가 이름을 찾지 못한 사건, webhook이 HTTP 200을 반환해도 Matrix 검토 카드가 안 보인 사건이다.

“재시작해서 고쳤다”로 묶으면 다음 판단의 근거가 사라진다. 공개 `mastodon-lab`의 incident와 런북을 읽어 아래 사례로 나눴다. 원 기록이 제공하지 않는 정확한 시각·원본 로그·버전은 채워 넣지 않았다.

## 사례와 비교

| 증상 | 범위를 줄인 증거 | 기록에 남은 원인 또는 설명 | 다음에 먼저 볼 것 |
| --- | --- | --- | --- |
| Cloudflare 521 | 컨테이너·Puma·DB 정상, Nginx 상태 이상 | 유효하지 않은 Nginx 구성으로 기동 실패, 중복 설정 제거 후 복구 | `nginx -t`, 서비스 상태 |
| Sidekiq의 이름 해석 실패 | `ES_HOST`와 Compose 이름 비교 | `elasticsearch` → `es` 변경과 설정 불일치 | 서비스명·환경변수·네트워크 |
| 가입 검토 카드 없음 | `account.created`, POST 200, polling | 이메일 인증 대기 또는 카드 전에 승인된 계정 | `confirmed`, `approved`를 각각 확인 |
| fork의 CI 실패 | 같은 upstream 태그의 깨끗한 worktree는 lint 통과 | 테마·정규화·lint 설정에 누적된 fork 차이 | 실패 테스트와 같은 릴리스의 diff |

각 행의 기록 범위와 미검증 부분은 연결된 case note에서 구분한다.

## 내가 여기서 배운 것

HTTP 200은 webhook 수신 성공이지 검토·승인 성공이 아니다. 컨테이너가 healthy여도 외부 요청을 받는 Nginx가 멈출 수 있다. 카드가 없다는 사실만으로 인프라 장애라고 할 수도 없다. **어느 경계를 통과했는지**가 다음 확인 위치를 정한다.

사건 기록은 당시의 판단을 보존하고, 런북은 적용 조건이 맞을 때 다시 쓸 절차를 추린다. 두 문서를 동일한 명령 모음으로 만들지 않는다.

## 다시 사용할 수 있는 질문

- 최초 증상과 실제 영향 범위는 무엇인가?
- 마지막으로 성공이 확인된 경계는 어디인가?
- 그 성공 로그가 보장하지 않는 다음 단계는 무엇인가?
- 어떤 가설을 증거로 배제했고, 어떤 가설은 남았는가?
- 원인이 application / configuration / infrastructure 중 어디에 가까운가?
- 변경한 설정·코드·버전과 복구 결과 사이에 어떤 증거가 있는가?
- 복구 검증이 수신·화면·최종 사용자 작업 중 어디까지 도달했는가?
- 이전 런북의 환경과 지금 환경이 다르면 어디서 중단해야 하는가?

이 네 사건을 다음 문제에서 사용할 진단 순서로 묶은 문서는 [운영 사건에서 실패 경계를 찾는 방법](/docs/kr/diagnosing-operational-boundaries/)이다. 이 Note는 각 판단이 생긴 근거와 차이를 남긴다.

## 한계 / 반례

이 문서는 기록의 재구성이다. 실제 서버에 접속하거나 장애를 재현한 검증이 아니다. 한 incident의 `ES_HOST=es`를 모든 배포의 정답으로 쓰지 않는다. 기록에 없는 가설을 “당시 시도했다”로 쓰거나 마지막 검증 단계를 추정해서 성공으로 표시하지 않는다.

## 연결

- [Cloudflare 521: 앱은 정상인데 Nginx가 기동하지 않았다](/notes/case-cloudflare-521-nginx/)
- [Elasticsearch: 서비스명과 ES_HOST가 달랐다](/notes/case-elasticsearch-service-name/)
- [가입 검토 봇: 이메일 인증 대기를 장애로 읽었다](/notes/case-signup-bot-email-wait/)
- [Mastodon fork CI: upstream과 비교해 실패 범위를 줄이다](/notes/case-mastodon-fork-ci/)
- [생각의 변화 이유를 남기기](/notes/documenting-thought-changes/)
