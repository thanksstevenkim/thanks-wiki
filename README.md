# thanks-wiki

**어떤 사례를 통해 무엇을 배웠고, 다음에는 무엇을 확인해야 하는지 다시 꺼내보는 개인 지식 저장소**입니다. 기술·플랫폼·산업·콘텐츠·도시의 관찰을 결론만으로 압축하지 않습니다. 관찰이 생긴 제품, 국가, 작품, 오류와 비교를 함께 보존합니다.

## 읽는 방법

[Docs](https://thanks-wiki.vercel.app/docs/kr/)는 여러 Notes와 사례에서 반복된 내용을 재사용 가능한 분석 방법으로 정리합니다. [질문 지도](https://thanks-wiki.vercel.app/notes/knowledge-map/)에서는 그 방법을 만든 개념과 사례를 함께 읽습니다. `concept`는 여러 사례에 적용해 볼 질문, `case`는 그 질문의 출발점과 검증 범위입니다. Notes는 생각이 생기고 바뀐 과정과 세부 근거를 보존하며, Docs가 생겨도 삭제하거나 대체하지 않습니다.

첫 개편 배치에서는 8개 핵심 개념과 가입 대기 노트를 보강하고, 12개 사례를 추가했습니다. POCO, 가나·코트디부아르의 카카오, 방글라데시 봉제, Pointless Talk, SHINee, Mastodon·Misskey, 한국·일본 비교, 실제 Mastodon 운영 장애를 다룹니다. 새 사례의 원문 범위와 한계는 각 문서에 적었습니다.

## 작성 원칙

- **구체성:** 공개 제품·기업·국가·기술·작품명을 보존합니다. 추상 결론에는 그 결론을 만든 사례와 비교를 연결합니다.
- **출처:** 직접 제공된 대화 발췌, 검색으로 복원한 대화 요약, 공개 운영 기록, 공식 문서를 구분합니다. 검색 요약을 원문 인용으로 만들지 않습니다.
- **사실과 해석:** 확인한 공개 사실, 당시 관찰, 가설, 미확인 정보를 구분합니다. 최신 숫자·버전·순위가 필요하면 기간과 1차 자료를 확인하고, 확인하지 못한 숫자를 만들지 않습니다.
- **재사용:** 각 주요 노트에 다시 사용할 질문, 한계와 반례를 둡니다. 사건 기록은 실제로 해결·검증한 범위까지만 적습니다.
- **개인정보:** 의료·가족·사적 관계·개인 재정·정확한 생활 위치를 제외합니다. 이메일·IP·토큰·사용자 계정·비공개 메시지는 삭제하거나 역할을 나타내는 placeholder로 바꿉니다. 기술 구조와 공개 사례까지 지우지는 않습니다.

## 문서 틀

일반 노트는 질문 → 출발점 → 사례 → 비교 → 배운 것 → 다시 사용할 질문 → 한계 / 반례 → 연결 순서로 작성합니다. 필요하면 개념과 사례를 분리합니다.

기술 사건은 증상 → 환경 → 확인한 로그 → 처음 세운 가설 → 틀렸던 가설 → 실제 원인 → 해결 → 검증 → 재발 방지 → 일반화 순서를 기본으로 합니다. 기록에 없는 명령 출력·복구 결과는 추가하지 않고 미확인으로 남깁니다. 공개 운영 기록은 가능하면 커밋에 고정해 링크합니다.

## 개발과 검토

Astro 정적 사이트이며 Markdown 노트는 `src/content/notes/`에 있습니다. `pnpm install --frozen-lockfile`, `pnpm build`로 빌드하고, `pnpm dev` 또는 `pnpm preview`에서 확인합니다. 저장소가 지정한 pnpm 버전을 사용합니다.

PR 전에는 사례 근거, 개념↔사례 링크, 다시 사용할 질문, 개인정보를 검토합니다. Preview에서는 실제 본문·표·로그·링크와 모바일 화면을 확인합니다. 문서 수 증가만으로 완료를 판단하지 않습니다.

## Live

* **Official site**: [https://thanks-wiki.vercel.app](https://thanks-wiki.vercel.app)
* 이 주소가 thanks-wiki의 유일한 공식 배포처입니다.

---

## Author

* GitHub: [https://github.com/thanksstevenkim](https://github.com/thanksstevenkim)
* Blog: [https://thanksstevenkim.dev](https://thanksstevenkim.dev)

## License

- Code: MIT License
- Content: CC BY-NC-ND 4.0 (see CONTENT_LICENSE.md)

## Notice

This repository and https://thanks-wiki.vercel.app constitute the **only official source** of thanks-wiki.

Forks and mirrors must not present themselves as official or authoritative versions of this project.
