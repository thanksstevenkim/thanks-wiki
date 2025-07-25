# 📚 thanks-wiki

**thanks-wiki**는 기술 개념을 정리하고, 다국어로 문서화하는 정적 위키 프로젝트입니다.  
기초적인 개념부터 탈중앙 웹, ActivityPub, 오픈소스 생태계 등 관심 주제를 정리하며,  
스스로의 학습과 포트폴리오 용도로 병행하고 있습니다.

---

## 🧭 프로젝트 개요

- **목적**: 정리하고 싶은 기술 개념을 다국어로 체계화
- **방식**: Astro 기반 정적 사이트로 구축, `/docs/kr`, `/docs/en` 디렉토리로 언어 분리
- **타깃 독자**: 저 자신 (메타인지용) + 오픈소스/탈중앙 개념에 관심 있는 개발자

---

## 🛠️ 기술 스택

| 영역 | 사용 기술 |
|------|------------|
| 프레임워크 | [Astro](https://astro.build/) |
| 마크다운 렌더링 | Astro Content Collections + MDX |
| 스타일링 | Tailwind CSS |
| 배포 | GitHub Pages |

---

## 🌐 문서 구조

- `/docs/kr`: 한국어 기술 문서
- `/docs/en`: 영어 번역 문서 (직접 번역 or GPT 보조 후 교정)
- 사이드바/라우팅 구성은 언어별로 자동 처리되도록 설정

---

## 🧩 구현 중인 기능

- [x] 다국어 디렉토리 기반 라우팅
- [x] 사이드바 및 문서 자동 인덱싱
- [x] 언어 전환 버튼
- [ ] 검색 기능 추가 (Algolia 등 고려)
- [ ] 코드블럭 다크 모드 테마 커스터마이징

---

## 📖 작성 중 문서 주제 (예시)

| 주제 | 설명 | 상태 |
|------|------|------|
| ActivityPub이란? | Fediverse의 핵심 프로토콜 개요 | ✅ 작성 |
| 탈중앙화란? | Web3와 Fediverse 비교 중심 | ⏳ 초안 작성 |
| Supabase 구조 이해 | RLS, Auth 흐름 중심 정리 | ✅ 작성 |
| Astro 구조 이해 | Content collections, MDX 활용법 | ⏳ 작성 예정 |

> ✨ 각 문서는 최대한 "나에게 설명하듯" 쓰는 것을 원칙으로 삼고 있습니다.

---

## 🧠 회고 & 앞으로의 방향

- 다국어 문서를 정리하면서, **개념을 설명 가능할 정도로 이해하는 메타인지 훈련**이 된다고 느낌
- GPT를 활용해 초벌 번역을 하고, 직접 교정하는 과정도 언어 감각 훈련에 도움
- 단순 블로그보다 더 **구조적인 글쓰기 습관**을 만들고자 위키 형태를 택함

### 앞으로 하고 싶은 것:
- 문서 10편 이상 작성 → 주제별로 태그/필터 기능 도입
- Fediverse 생태계 관련 도식화
- Astro로 직접 만든 검색 기능 붙이기 (검색 라이브러리 학습 예정)

---
## 🔗 미리보기

> **Live URL**: https://thanks-wiki.vercel.app

---

## 🤝 Contact

- GitHub: [thanksstevenkim](https://github.com/thanksstevenkim)
- 블로그: [thanksstevenkim.dev](https://thanksstevenkim.dev)
- 이메일: stevenkim0325@gmail.com
