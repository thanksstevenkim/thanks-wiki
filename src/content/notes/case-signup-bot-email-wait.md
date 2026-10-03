---
title: "가입 검토 봇: 이메일 인증 대기를 장애로 읽었다"
date: 2026-10-03
tags: [case, operation, failure, mastodon]
status: growing
lang: ko
---

## 질문

Mastodon 가입 webhook은 도착했는데 Matrix에 검토 카드가 없으면 봇이 고장 난 것인가?

## 증상

관리 화면에는 가입 대기 계정이 있는데 검토 카드가 보이지 않았다. 대화 검색 요약에는 이메일 미인증과 아직 지나지 않은 24시간 대기가 카드 부재를 설명하는지 검토한 질문이 남았다. 전체 대화 로그는 확보하지 못했다.

## 환경과 근거 범위

Mastodon의 승인제 가입 → `account.created` webhook → Nginx → Docker의 `fedi-signup-bot` → Mastodon Admin API 상태 조회 → Matrix 검토방 → Admin API 승인·거절 구조다.

공개 [signup review bot 런북](https://github.com/thanksstevenkim/mastodon-lab/blob/15b99f151f4d022534ac65b172f8f2eeee54b084/runbooks/mastodon-signup-review-bot.md) 원문과 대화 검색 반환 요약을 확인했다. 아래 로그는 공개 런북에서 확인한 문구다. 계정명·계정 ID·IP·룸 ID·운영 도메인은 본문 로그에서 제거했다. 출처 저장소는 본인이 공개한 기술 작업이므로 유지한다. 실제 서버나 봇 소스 코드에는 접속하지 않았다.

런북에 기록된 이 배포의 설정은 다음과 같다. Mastodon 전체의 기본 동작이 아니다.

```yaml
email_confirmation:
  poll_interval: 60
  timeout: 86400
  on_timeout: notify
manual_action_poll_interval: 300
```

## 확인한 로그

아래는 **서로 다른 관찰에서 필요한 부분만 뽑아 식별자를 치환한 발췌**다. 하나의 연속된 원본 로그처럼 읽지 않는다.

```text
Webhook event=account.created from instance=<INSTANCE>
POST /webhook/<INSTANCE> HTTP/1.1" 200
Polling account status for <ACCOUNT>
```

첫 줄과 POST 200은 webhook 수신을, polling은 계정 상태 조회 단계의 시작을 뒷받침한다. Matrix 카드 게시·이메일 인증·최종 승인까지 보장하지 않는다.

공개 런북에는 별도 초기 테스트에서 다음 메시지도 남았다. 식별자만 제거했다.

```text
<ACCOUNT> was manually approved before bot posted card
<ACCOUNT> already approved manually — posting notice
```

대화 검색 요약에는 다른 테스트 계정의 이메일 인증이 두 번의 polling 후 확인되고 review 게시까지 진행됐다는 기록이 있다. 원본 전체 로그를 다시 확보한 것은 아니므로 그 문장을 새 원본 로그로 재구성하지 않는다.

## 처음 세운 가설과 수정

| 가설 | 확인한 증거 | 판단 |
| --- | --- | --- |
| webhook이 오지 않는다 | 이벤트 로그·POST 200·polling | 관찰된 요청에서는 수신 실패 가설과 맞지 않음 |
| HTTP 405이 장애다 | 브라우저는 GET, webhook은 POST | 런북의 설명과 맞는 메서드 차이 |
| 카드 없음이 곧 봇 오류다 | 인증 대기 설정과 계정 상태 확인 필요 | 이 증상만으로 판정할 수 없음 |
| 카드 전에 이미 승인됐다 | 별도 초기 테스트의 승인 감지 로그 | 그 테스트는 정상 사전 검토 흐름을 검증하지 못함 |

## 실제 원인 / 남은 불확실성

공개 런북은 **이메일 인증을 기다린 뒤 카드 게시**를 하도록 설명한다. 초기 테스트에는 카드 전에 승인된 경로가 확인됐다. 이후 대화에서 미인증 계정의 대기를 봇 장애로 오해했을 가능성이 제시됐다.

원본 전체 로그와 당시 계정 상태 스냅샷은 이번 작업에서 확보하지 못했다. 모든 누락 카드의 원인이 이메일 미인증이었다고 확정하거나, 당시 문제가 하나였다고 합치지 않는다. [Admin::Account 공식 정의](https://docs.joinmastodon.org/entities/Admin_Account/)는 `confirmed`와 `approved`를 별도 값으로 설명한다. [webhook 문서](https://docs.joinmastodon.org/admin/webhooks/)는 POST와 `account.created`를 확인해 준다. 공식 자료 확인일: 2026-10-03.

## 해결

이 사례의 대응은 설정을 무작정 바꾸는 것이 아니라 **수신·인증 대기·승인·게시를 나눠 진단하는 것**이다. 런북의 완전한 흐름 검증은 승인제 가입을 켜고, 테스트 계정을 인증한 뒤 Mastodon에서 먼저 승인하지 않고 Matrix 카드의 승인·거절을 시험하도록 제안한다.

이 문서 작성 과정에서 서버 설정을 수정하거나 테스트 계정을 만들지는 않았다.

## 검증

- 공개 런북의 초기 검증 범위: 컨테이너 기동, Matrix 연결, health 응답, webhook 수신, polling, 선행 승인 감지.
- 대화 검색 요약의 후속 범위: 인증된 테스트 계정의 review 게시 성공.
- 미확인: Matrix에서 승인·거절한 뒤 Admin API 최종 상태까지 검증한 전체 증거, timeout 처리의 실제 결과.

## 재발 방지 / 다시 사용할 수 있는 질문

- `account.created`와 POST 성공이 있는가?
- `confirmed`와 `approved`는 각각 무엇인가?
- 인증 대기 timeout과 polling 주기는 이 배포에서 얼마인가?
- 카드 전에 수동 또는 자동 승인한 경로가 있는가?
- 카드 게시와 Matrix 모바일 알림을 구분했는가?
- 대기·timeout·선행 승인·실패 로그가 다른 상태를 드러내는가?
- 승인뿐 아니라 거절의 최종 상태도 검증했는가?

## 일반화할 수 있는 교훈 / 한계

**정상적으로 기다리는 상태와 실패를 구분할 관측 정보가 필요하다.** POST 200을 전체 성공으로, 화면에 카드가 없는 것을 전체 실패로 읽지 않는다. 미인증의 이유는 메일 전달 문제·관심 상실 등 여러 가능성이 있으므로 개인의 의도를 추정하지 않는다.

## 연결

- 개념: [장애 기록이 대응 절차가 되는 순간](/notes/incident-to-runbook/)
- 개념: [가입 후 첫 관계는 어떻게 만들어지는가](/notes/first-meaningful-interaction/)
- [가입했지만 인증하지 않은 사람](/notes/signup-without-confirmation/)
- [Mastodon 가입에서 관계 발견까지](/notes/case-mastodon-onboarding/)
