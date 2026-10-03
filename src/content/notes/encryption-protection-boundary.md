---
title: 암호화는 어느 구간을 보호하는가
date: 2026-10-03
tags: [concept, security, trust, ux]
status: growing
lang: ko
---

## 질문

“암호화되어 있다”는 설명으로 메시지를 누가 볼 수 있는지 판단할 수 있는가?

## 출발점

Pointless.chat의 Pointless Talk 베타를 논의할 때, 전송 중 암호화는 있지만 E2EE는 구현하지 않았다는 설명이 전달되었다. 이 사례에서 질문은 “암호화가 있는가”에서 **“서버도 메시지를 볼 수 없는가”**로 바뀌었다.

과거 대화만으로 현재 상태를 단정하지 않고 2026-10-03에 공식 [신뢰 페이지](https://talk.pointless.chat/trust?lang=ko)를 확인했다. HTTPS 사용과 E2EE 미제공, 서버의 메시지 처리 가능성을 명시한다. 구현을 감사한 결과와는 구분한다.

## 사례와 비교

[Pointless Talk의 보호 범위](/notes/case-pointless-talk-encryption/)와 Mastodon의 private mention을 비교한다.

| 질문 | Pointless Talk의 공식 설명 | Mastodon private mention의 공식 안내 |
| --- | --- | --- |
| 전달 대상 제한 | 대화 접근 권한을 확인 | 멘션한 계정으로 공개 범위 제한 |
| 서버의 내용 접근 | 전달을 위해 처리 가능 | 송·수신 서버 DB 관리자가 접근 가능 |
| 장기 보관 | 본문·첨부는 최대 72시간의 서버 임시 보관 정책 | 공개 범위 설정만으로 보관 기간을 알 수 없음 |
| 종단간 비밀성 | E2EE 미제공 | 암호화 메신저와 동일하게 취급할 수 없음 |

Mastodon 항목의 근거는 [게시물 공개 범위 안내](https://docs.joinmastodon.org/user/posting/)다. 전체 보안 수준을 순위로 매기는 표가 아니다.

## 내가 여기서 배운 것

전송 보호, 접근 권한, 보관 기간, E2EE는 다른 질문이다. 짧게 보관하는 것은 유용한 보호 전략일 수 있지만, 서버가 처음부터 내용을 읽지 못한다는 보장은 아니다. [MDN의 TLS 설명](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security)은 클라이언트와 서버 사이의 연결 보호를 다룬다.

## 다시 사용할 수 있는 질문

- 보호하려는 상대는 네트워크 도청자, 서버 운영자, 침해된 기기 중 누구인가?
- TLS 연결은 어디에서 끝나며 그 뒤 누가 평문을 처리하는가?
- E2EE를 명시하는가? 키·다중 기기·복구 방식의 설명이 있는가?
- 본문·첨부·메타데이터·로그·백업의 보관 기간은 각각 무엇인가?
- 삭제 정책은 공식 설명인가, 코드 확인인가, 동작 검증인가?
- 로그인 보안과 메시지 비밀성을 혼동하고 있지 않은가?

## 한계 / 반례

E2EE도 수신자의 저장·스크린샷이나 침해된 단말을 자동으로 해결하지 않는다. E2EE가 없는 서비스를 무조건 무가치하다고 할 수도 없다. 사용 목적과 필요한 보호를 정하고 그 기대에 맞는지 확인해야 한다.

## 연결

- [Pointless Talk: HTTPS·보관 최소화·E2EE를 나눠 읽기](/notes/case-pointless-talk-encryption/)
- [보안은 강해졌는데 사용자는 더 불안할 수 있다](/notes/security-and-felt-safety/)
