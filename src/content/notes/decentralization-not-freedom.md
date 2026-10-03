---
title: 분산화가 곧 자유를 의미하지는 않는다
date: 2026-10-03
tags: [concept, fediverse, choice]
status: growing
lang: ko
---

## 질문

서버를 선택하고 옮길 수 있다는 권리가 실제 사용할 수 있는 선택지가 되려면 무엇이 필요한가?

## 출발점

Fediverse 대화에서 Mastodon 외에 Misskey 계열 서버도 같은 네트워크를 구성한다는 점을 논의했다. 서버만 바꾸는 것과 소프트웨어의 사용 경험까지 바꾸는 것은 같지 않다. 계정 이동 역시 관계와 기록이 모두 그대로 이동하는지 확인해야 한다.

정확한 이동 사건의 원본은 확보하지 못했다. 아래는 **대화의 문제의식을 공식 기능 문서로 구체화한 비교**이며 실제 계정 이전 실험이나 실패 후기가 아니다.

## 사례와 비교

[Mastodon·Misskey의 비교](/notes/case-mastodon-misskey-choice/)에서 두 종류의 경계를 살핀다.

| 경계 | 확인한 기능 | 사용자가 다시 결정할 것 |
| --- | --- | --- |
| Mastodon 계정 이동 | Move를 지원하는 팔로워 이동, 별도 CSV 내보내기·가져오기 | 새 서버의 규칙, 기록 보관, 이동할 관계 |
| 게시물·미디어 | Mastodon은 가져오기를 지원하지 않음 | 과거 기록의 접근·보존 방식 |
| Misskey 리액션 → 다른 서버 | 대체로 Like로 전달, 상대 소프트웨어의 표현에 따름 | 감정 표현이 동일하게 전달되는가? |

출처는 [Mastodon 이동 문서](https://docs.joinmastodon.org/user/moving/)와 [Misskey 리액션 문서](https://misskey-hub.net/en/docs/for-users/features/reaction/)다. 모든 fork·버전·클라이언트 조합의 동작을 확인한 것은 아니다.

## 내가 여기서 배운 것

분산화는 운영자를 고를 선택지를 만든다. 그 선택의 실효성은 이동 가능한 데이터, 기능 호환, 규칙 이해, 운영 지속성에 달려 있다. 생각이 바뀐 지점은 “나갈 수 있다”에 **“무엇을 들고 어디로 갈 수 있는가”**를 더한 것이다.

이 개념을 가입·운영·연합 경계와 함께 적용하는 순서는 [Fediverse 서버와 커뮤니티를 이해하는 방법](/docs/kr/fediverse-server-community-analysis/)에서 정리한다.

## 다시 사용할 수 있는 질문

- 바꾸려는 것은 서버 운영자, 규칙, 클라이언트, 소프트웨어 중 무엇인가?
- 팔로워·팔로우·차단·음소거·게시물·미디어 중 무엇이 이동되는가?
- 자동 이동과 수동 가져오기를 구분했는가?
- 상대 소프트웨어가 Move나 리액션 표현을 어떻게 처리하는가?
- 새 서버의 가입 방식·규칙·연합 제한을 읽었는가?
- 이전 서버가 닫힌 뒤에도 필요한 기록에 접근할 수 있는가?

## 한계 / 반례

기능 차이는 비용이지만 선택의 이유이기도 하다. 소규모 서버가 무조건 자유롭거나 대형 서버가 무조건 안정적이라는 결론은 나오지 않는다. Mastodon 내부 이동 설명을 모든 ActivityPub 소프트웨어의 보장으로 확장하지 않는다.

## 연결

- [Mastodon·Misskey: 연결되어도 경험은 같지 않다](/notes/case-mastodon-misskey-choice/)
- [서버는 규칙으로 만들어지는 장소](/notes/server-as-governed-place/)
- [가입 후 첫 관계는 어떻게 만들어지는가](/notes/first-meaningful-interaction/)
- 상위 방법: [Fediverse 서버와 커뮤니티를 이해하는 방법](/docs/kr/understanding-fediverse-communities/)
