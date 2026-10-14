# 개발/운영 클라우드 인프라 아키텍쳐
> **AWS Cloud Infrastructure Architecture Interactive Dashboard**  
> ChatGPT 기획 → Claude Code 코딩 → AWS 개발망 직결 구축 (오류 Zero) → 운영 서버 1:1 복제 확장

## 프로젝트 개요

본 프로젝트는 **AI 바이브 코딩(ChatGPT + Claude Code)** 기반으로 개발망에 직접 SSH 배포·검증한 후, 이를 **AWS 실운영 환경으로 1:1 무중단 복제 확장**하는 모던 클라우드 인프라 아키텍처 대시보드입니다.

- **실시간 인터랙티브 필터**: 전체 아키텍처 / 개발 환경 (Dev) / 운영 환경 (Prod) 환경별 포커싱
- **애플 감성 UI/UX**: Cupertino Dark Midnight 스타일, 3D 누끼 캐릭터 실루엣 호버 효과
- **인프라 스펙 서랍 (Drawer)**: 각 노드 클릭 시 클라우드 인스턴스 사양 및 계층 상세 정보 제공

---

## 아키텍처 주요 구성

### 1. 개발망 (AWS Dev VPC)
- **개발자 직결**: Developer 워크스테이션에서 EC2 개발 프론트엔드로 SSH 직접 코딩 및 실시간 핫리로드
- **코어 3-티어 개발 스택**:
  - `EC2 Frontend` (Next.js, t3.small)
  - `EC2 Backend` (FastAPI, t3.medium)
  - `RDS PostgreSQL` (db.t3.small)

### 2. 중앙 1:1 복제 회랑 (Replication Sync Bridge)
- **1:1 UI 복제**: 개발 프론트엔드 빌드 아티팩트 본 운영 자동 동기화
- **1:1 API 복제**: REST API 엔드포인트 및 비즈니스 로직 1:1 미러링
- **DB 스냅샷 이관**: 개발 검증 DB 스냅샷을 운영 RDS로 무결성 이관

### 3. 본 운영망 (AWS Production VPC)
- **Ingress & Protection**: `Route 53` (DNS) → `AWS WAF` (L7 웹 방화벽) → `Application Load Balancer` (ALB)
- **Replicated Core Stack**: 1:1 복제된 프론트엔드, 백엔드, PostgreSQL 데이터베이스
- **Database & Storage**: `ElastiCache Redis` (고속 인메모리 캐시) + `Amazon S3` (BOM 및 도면 파일 스토리지)
- **LLM AI**: `OpenAI API` (ChatGPT 모델 실시간 질의/추론 연동)
- **Governance & Ops**: `CloudWatch` (실시간 메트릭/알람 관제) + `VPC & NAT Gateway` (보안 프라이빗 서브넷 망분리)

---

## 파일 구조

```text
├── index.html                           # 메인 대시보드 엔트리포인트
├── styles.css                           # 애플 다크 디자인 시스템 스타일시트
├── app.js                               # 대시보드 렌더링 및 모드 전환 필터 컨트롤러
├── data.js                              # 클라우드 노드 상세 스펙 데이터 정의
├── asset_developer_3d.png               # 개발자 3D 캐릭터 투명 누끼 그래픽
├── asset_users_3d.png                   # 사내 사용자 3D 캐릭터 투명 누끼 그래픽
└── README.md                            # 프로젝트 안내 및 배포 문서
```

---

## GitHub Pages 배포 안내

1. 본 저장소를 GitHub에 푸시합니다.
2. 저장소의 **Settings** → **Pages** 탭으로 이동합니다.
3. **Build and deployment** 항목의 **Source**를 `Deploy from a branch`로 설정하고, Branch를 `main` / `/(root)`로 지정 후 **Save**를 누릅니다.
4. 약 1~2분 후 배포가 완료되며, 브라우저를 통해 전 세계 어디서든 고유 URL로 접속할 수 있습니다.
