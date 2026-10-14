/**
 * ============================================================================
 * [PMS AWS 아키텍처 다이어그램 데이터 - data.js]
 * ============================================================================
 * 스크린샷과 동일한 AWS 공식 아키텍처 다이어그램 스타일 및 데이터 정의
 * 1. 기획(ChatGPT) → 코딩(Claude Code) → AWS 개발망 직결 구현 (환경 오류 Zero)
 * 2. 개발망 검증 완료 → 운영 서버 1:1 무오류 복제 배포 (WAF, ALB, Redis, S3, OpenAI API)
 * ============================================================================
 */

window.PMS_AWS_DIAGRAM = {
  title: "개발/운영 클라우드 인프라 아키텍쳐",
  subtitle: "ChatGPT 기획 · Claude Code 바이브 코딩 · AWS 개발망 직결 구축 · 운영 서버 1:1 복제 확장",

  // 1. 서비스 노드 정의 (애플 스타일의 간결하고 직관적인 명칭과 상세 사양 분리)
  nodes: {
    // [Client & Vibe Coding Tier]
    "user-client": {
      id: "user-client",
      name: "User",
      subTitle: "사내 경영진 / 구매팀",
      specs: "웹 브라우저 (Chrome, Safari, Edge)",
      category: "client",
      iconType: "user",
      tier: "client",
      env: "shared",
      desc: "구매 대시보드, BOM 계층 트리, 원가 변동 분석 UI에 접속하여 실시간 발주 현황을 조회하고 시연 검증 및 실서비스를 활용하는 사내 사용자 그룹입니다."
    },
    "user-dev": {
      id: "user-dev",
      name: "Developer",
      subTitle: "사내 바이브 코더",
      specs: "VS Code / 터미널 환경",
      category: "client",
      iconType: "developer",
      tier: "client",
      env: "shared",
      desc: "사내 비개발자 또는 1인 개발자로, 기획(ChatGPT) 및 코딩(Claude Code) AI 도구를 총괄 지휘하며 AWS 인프라 환경을 구축합니다."
    },
    "ai-chatgpt": {
      id: "ai-chatgpt",
      name: "ChatGPT",
      subTitle: "기획 & 아키텍처",
      specs: "GPT-4o / O1 High Reasoning",
      category: "ai",
      iconType: "chatgpt",
      tier: "client",
      env: "shared",
      desc: "AS-IS 구매 실무 프로세스 분석, 표준 vs 실행 MC(제조원가) 변동 산식 정의, RDS PostgreSQL 스키마(ERD) 및 상세 PRD 명세서를 초도 설계합니다."
    },
    "ai-claude": {
      id: "ai-claude",
      name: "Claude Code",
      subTitle: "터미널 코딩 에이전트",
      specs: "Claude 3.7 Sonnet (1M Context)",
      category: "ai",
      iconType: "claude",
      tier: "client",
      env: "shared",
      desc: "터미널 CLI 기반 AI 코딩 에이전트로, AWS 개발 서버에 SSH로 직결 접속하여 프론트(Next.js), 백엔드(FastAPI), DB 마이그레이션 코드를 실시간 구현 및 자동 디버깅합니다."
    },

    // [Edge & Ingress Tier]
    "aws-route53": {
      id: "aws-route53",
      name: "Amazon Route 53",
      subTitle: "DNS 도메인 라우팅",
      specs: "AWS 글로벌 Anycast DNS",
      category: "network",
      iconType: "route53",
      tier: "edge",
      env: "shared",
      desc: "사내 실운영 서비스 도메인을 안전하게 해석하여 AWS WAF 웹 방화벽 및 ALB 로드밸런서로 최적 라우팅합니다."
    },
    "aws-waf": {
      id: "aws-waf",
      name: "AWS WAF",
      subTitle: "웹 보안 방화벽",
      specs: "OWASP Top 10 차단 룰셋",
      category: "security",
      iconType: "waf",
      tier: "ingress",
      env: "prod",
      desc: "SQL Injection, XSS, 무차별 대입 공격 등 악의적인 웹 트래픽을 인입 단계에서 원천 차단하여 기업 핵심 자산인 구매/원가 데이터를 보호합니다."
    },
    "aws-alb": {
      id: "aws-alb",
      name: "AWS ALB",
      subTitle: "부하분산 로드밸런서",
      specs: "Application Load Balancer (L7)",
      category: "network",
      iconType: "alb",
      tier: "ingress",
      env: "prod",
      desc: "HTTPS SSL/TLS 인증서 종단 처리 및 다중 사용자 트래픽을 프론트엔드/백엔드 타겟 그룹으로 지능적으로 분산 전달합니다."
    },

    // [Dev VPC: 개발 서버망 - 배포 오류 Zero]
    "dev-fe": {
      id: "dev-fe",
      name: "EC2 프론트",
      subTitle: "Next.js (개발)",
      specs: "t3.small (2 vCPU, 2GB RAM)",
      category: "compute-dev",
      iconType: "ec2",
      tier: "frontend",
      env: "dev",
      desc: "구매 대시보드, BOM 계층 트리, 원가 변동 차트 등 바이브 코딩 UI를 호스팅하며, 사내 시연 및 검증 웹 링크를 즉시 제공합니다."
    },
    "dev-be": {
      id: "dev-be",
      name: "EC2 백엔드",
      subTitle: "FastAPI (개발)",
      specs: "t3.medium (2 vCPU, 4GB RAM)",
      category: "compute-dev",
      iconType: "ec2",
      tier: "backend",
      env: "dev",
      desc: "표준 MC vs 실행 MC 변동 요인 자동 계산 엔진, MOQ/MPQ 최적 발주 로직, 수만 줄의 실무 엑셀 파서를 구동하는 핵심 코어 서버입니다."
    },
    "dev-rds": {
      id: "dev-rds",
      name: "Amazon RDS",
      subTitle: "PostgreSQL (개발)",
      specs: "db.t3.small (2 vCPU, 2GB, 30GB gp3)",
      category: "database-dev",
      iconType: "rds",
      tier: "database",
      env: "dev",
      desc: "자재 마스터, BOM Revision 이력, 단가/발주 원장을 관리하며 실무 엑셀의 파편화된 데이터를 무결성 정규화 테이블에 적재합니다."
    },

    // [Prod VPC: 운영 서버망 - 추가 임대 확장]
    "prod-fe": {
      id: "prod-fe",
      name: "EC2 프론트",
      subTitle: "Next.js (운영)",
      specs: "t3.small (2 vCPU, 2GB RAM)",
      category: "compute-prod",
      iconType: "ec2",
      tier: "frontend",
      env: "prod",
      desc: "개발 서버에서 검증 완료된 UI 컨테이너를 1:1 복제 이관하여 환경 불일치 오류 0%로 안정 서비스합니다."
    },
    "prod-be": {
      id: "prod-be",
      name: "EC2 백엔드",
      subTitle: "FastAPI (운영)",
      specs: "t3.medium (2 vCPU, 4GB RAM)",
      category: "compute-prod",
      iconType: "ec2",
      tier: "backend",
      env: "prod",
      desc: "개발 서버와 동일한 리눅스 런타임 환경으로 MC 원가 산출 엔진 및 비즈니스 로직을 사내 전사 실서비스로 운용합니다."
    },
    "prod-rds": {
      id: "prod-rds",
      name: "Amazon RDS",
      subTitle: "PostgreSQL (운영)",
      specs: "db.t3.small (2 vCPU, 2GB, 50GB gp3)",
      category: "database-prod",
      iconType: "rds",
      tier: "database",
      env: "prod",
      desc: "개발망에서 정합성 검증이 끝난 DB 스키마와 원장을 스냅샷으로 무결성 이관하여 매일 자동 백업과 함께 정규 운용합니다."
    },
    "prod-redis": {
      id: "prod-redis",
      name: "ElastiCache",
      subTitle: "Redis 캐시",
      specs: "cache.t3.micro (인메모리 캐시)",
      category: "database-prod",
      iconType: "elasticache",
      tier: "database",
      env: "prod",
      desc: "복잡한 MC 제조원가 연산 결과 및 대시보드 통계를 밀리초 단위로 초고속 캐싱하여 시스템 응답 속도를 극대화합니다."
    },
    "prod-s3": {
      id: "prod-s3",
      name: "Amazon S3",
      subTitle: "BOM·도면 스토리지",
      specs: "Standard S3 (암호화 버킷)",
      category: "storage-prod",
      iconType: "s3",
      tier: "database",
      env: "prod",
      desc: "협력사 단가 인상 공문 PDF 원본, 실무 엑셀 원본 파일, 자재 도면 등을 안전하게 영구 보관합니다."
    },
    "prod-openai": {
      id: "prod-openai",
      name: "OpenAI API",
      subTitle: "LLM AI (ChatGPT 연동)",
      specs: "GPT-4o REST API (RAG Search)",
      category: "ai-external",
      iconType: "openai-api",
      tier: "llm-ai",
      env: "prod",
      desc: "실무자의 자연어 질의를 자동 해석하여 공문 원본 100% 인용 기반의 신뢰도 높은 원가 분석 답변을 제공합니다."
    },

    // [우측 Governance & Observability]
    "mgmt-cloudwatch": {
      id: "mgmt-cloudwatch",
      name: "CloudWatch",
      subTitle: "실시간 모니터링",
      specs: "메트릭 수집 & 알람 & 로그",
      category: "management",
      iconType: "cloudwatch",
      tier: "mgmt",
      env: "shared",
      desc: "서버 리소스(CPU, 메모리, 디스크), API 호출 로그 및 비정상 트래픽 장애 알람을 중앙에서 24/7 수집하고 관제합니다."
    },
    "mgmt-backup": {
      id: "mgmt-backup",
      name: "AWS Backup",
      subTitle: "자동 백업",
      specs: "RDS 스냅샷 일일 자동 보관",
      category: "management",
      iconType: "backup",
      tier: "mgmt",
      env: "shared",
      desc: "매일 지정된 시각에 RDS 및 EBS 볼륨 스냅샷을 자동 생성 및 보존하여 데이터 손상 시 즉각적인 시점 복구를 보장합니다."
    },
    "mgmt-vpc": {
      id: "mgmt-vpc",
      name: "VPC & NAT",
      subTitle: "보안 서브넷",
      specs: "Private Subnet 격리 & NAT GW",
      category: "management",
      iconType: "vpc-net",
      tier: "mgmt",
      env: "shared",
      desc: "데이터베이스와 백엔드 서버를 외부 인터넷과 물리적으로 차단된 프라이빗 서브넷에 격리하여 최고 수준의 망분리 보안을 유지합니다."
    }
  },

  // 2. 연결선(Connections) 정의
  connections: [
    // [Client Flow: 바이브 코딩 직결 & 실운영 접속]
    { from: "user-dev", to: "dev-fe", label: "SSH 직결 코딩", style: "dev-coding" },
    { from: "user-client", to: "aws-route53", label: "HTTPS", style: "default" },

    // [Ingress & Protection Flow]
    { from: "aws-route53", to: "aws-waf", label: "", style: "prod-traffic" },
    { from: "aws-waf", to: "aws-alb", label: "", style: "prod-traffic" },
    { from: "aws-alb", to: "prod-fe", label: "", style: "prod-traffic" },

    // [Dev VPC Internal: 코어 체인]
    { from: "dev-fe", to: "dev-be", label: "/api", style: "dev-coding" },
    { from: "dev-be", to: "dev-rds", label: "SQL :5432", style: "dev-coding" },

    // [Deployment Bridge: 1:1 무오류 복제 배포]
    { from: "dev-fe", to: "prod-fe", label: "1:1 UI 복제", style: "deploy-bridge" },
    { from: "dev-be", to: "prod-be", label: "1:1 API 복제", style: "deploy-bridge" },
    { from: "dev-rds", to: "prod-rds", label: "DB 스냅샷 이관", style: "deploy-bridge" },

    // [Prod VPC Internal: 1:1 복제 코어]
    { from: "prod-fe", to: "prod-be", label: "/api", style: "prod-traffic" },
    { from: "prod-be", to: "prod-rds", label: "SQL :5432", style: "prod-traffic" },

    // [Prod VPC Internal: 데이터 버스 확장]
    { from: "prod-be", to: "prod-redis", label: "", style: "prod-traffic" },
    { from: "prod-be", to: "prod-s3", label: "", style: "prod-traffic" },
    { from: "prod-be", to: "prod-openai", label: "", style: "prod-traffic" }
  ]
};
