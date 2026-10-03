---
title: "Mastodon fork CI: upstream과 비교해 실패 범위를 줄이다"
date: 2026-10-03
tags: [case, operation, failure, mastodon]
status: growing
lang: ko
---

## 질문

운영 서비스는 돌아가는데 fork의 CI만 실패할 때 테스트를 바꿔야 하는가, fork 차이를 먼저 봐야 하는가?

## 증상과 환경

공개 incident `SUP-0009`는 운영 서비스 장애 없이 GitHub Actions의 CSP·`Tag.search_for(nil)` 테스트와 JavaScript lint 등이 실패한 사건을 다룬다. 원 기록의 환경 명칭은 custom Mastodon fork, Mastodon 4.6.6, GitHub Actions다.

[원 incident 본문](https://github.com/thanksstevenkim/mastodon-lab/blob/15b99f151f4d022534ac65b172f8f2eeee54b084/incidents/009-github-actions-failures-from-fork-drift.md)을 2026-10-03에 확인했다. 여기의 버전은 **운영 기록에 기재된 환경**이다. upstream 코드·당시 Actions 실행 전체를 이번에 다시 검증한 결과는 아니다. 보안 advisory와 런타임 버전 주장은 별도 재검증 없이 복사하지 않았다.

## 확인한 로그와 차이

| 실패 | 기록에 있는 코드·설정 차이 | 기록의 원인 설명 |
| --- | --- | --- |
| CSP 기대값 | `javascript_inline_tag 'theme-selection.js'`와 `theme_color_tags color_scheme`가 고정 meta로 대체 | 필요한 inline script hash가 CSP에 추가되지 않음 |
| `Tag.search_for(nil)` | HashtagNormalizer가 빈 정규화 값에 nil 반환 | `sanitize_sql_like(nil)`로 NoMethodError |
| JSX lint | `files: ['**/*.jsx']`가 lint 설정에 추가 | 대상 파일 범위가 upstream과 달라짐 |
| streaming lint | workspace에 추가된 `lint:js` | `command not found: eslint`, exit 127 |

표는 원 incident의 분석을 보존한다. 원본 Actions 로그·수정 커밋 diff를 직접 읽은 것처럼 표시하지 않는다.

## 처음 세운 가설 / 틀렸던 가설

원 기록에는 처음에 개별 JSX 파일 문제처럼 보였다고 적혀 있다. 이를 구분하기 위해 정확한 upstream `v4.6.6` 태그를 깨끗한 worktree에 열었다.

```bash
# 당시 incident에 기록된 진단 명령
# 경로는 공개 가능한 예시로 치환했다.
git worktree add /tmp/mastodon-upstream-check v4.6.6
yarn lint:js --max-warnings 0
```

명령은 해당 태그가 존재하는 저장소에서 쓰는 비교 절차다. 여기에서 실행한 명령이 아니다.

## 실제 원인

원 기록은 깨끗한 upstream에서는 lint가 exit 0으로 끝났고 fork의 테마·정규화·lint 구성 차이를 찾았다고 보고한다. “Mastodon 전체의 오류”에서 **누적된 fork 차이**로 조사 범위를 줄였다.

## 해결

기록에서는 관련 구성·컴포넌트를 upstream 동작으로 복원했다. 무조건 모든 custom 코드를 지우는 원칙이 아니라, 의도한 변경과 이미 낡은 차이를 구분하는 절차로 읽는다.

## 검증

원 incident에는 upstream lint와 수정 후 lint의 exit 0이 명시돼 있다. CSP·Tag 관련 코드를 복원했다고 적혀 있지만 두 RSpec 테스트의 최종 실행 출력은 포함돼 있지 않다. 따라서 “전체 CI 통과”로 확대하지 않는다. 이번 작업에서 Mastodon 테스트를 실행하지 않았다.

## 재발 방지 / 다시 사용할 수 있는 질문

- 운영 장애와 CI 실패의 영향 범위를 구분했는가?
- 같은 릴리스·명령·의존성 조건의 upstream 비교가 있는가?
- 실패 코드는 의도한 customization인가, 남아 있던 drift인가?
- lint의 대상 범위와 workspace 명령 해석이 달라졌는가?
- 테스트 기대값을 바꾸기 전에 코드·구성 차이를 설명했는가?
- 통과한 검사와 아직 최종 출력이 없는 검사를 나눠 기록했는가?

## 일반화할 수 있는 교훈 / 한계

[장애 기록](/notes/incident-to-runbook/)을 “무엇을 복원했나”보다 **어떤 대조군으로 실패 범위를 줄였나**까지 확장한 사례다. upstream이 통과해도 모든 fork 기능의 정답을 보장하지 않는다. 이 자료의 분석은 당시 기록을 재구성한 것이며 독립 코드 감사는 아니다.

## 연결

- 개념: [장애 기록이 대응 절차가 되는 순간](/notes/incident-to-runbook/)
- [생성된 결과를 설명할 수 있는가](/notes/explain-the-generated-result/)
