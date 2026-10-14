/**
 * ============================================================================
 * [PMS 애플 디자인 스타일 AWS 아키텍처 다이어그램 렌더링 엔진 - app.js]
 * ============================================================================
 * 세 번째 스크린샷의 5-블록 통합 구조(Ingress & Protection, Replicated Core,
 * Database & Storage, LLM AI, Governance & Ops) 및 상단 Dev VPC 1:1 대칭 배치와
 * 100% 동일한 구조로 완전 통합 리팩토링된 인터랙티브 SVG 렌더링 엔진입니다.
 * ============================================================================
 */

(function () {
  const data = window.PMS_AWS_DIAGRAM;
  if (!data) return;

  // 1. 세 번째 스크린샷과 100% 일치하는 노드 정밀 좌표 맵 (1680 x 880 캔버스)
  const COORDS = {
    // 좌측: 개발자 & 사용자
    "user-dev":        { x: 140,  y: 205 },
    "user-client":     { x: 140,  y: 560 },

    // 상단 AWS Dev VPC (코어 3-티어 개발 스택)
    "dev-fe":          { x: 735,  y: 215 },
    "dev-be":          { x: 920,  y: 215 },
    "dev-rds":         { x: 1105, y: 215 },

    // 하단 AWS Production VPC - 블록 1: Ingress & Protection
    "aws-route53":     { x: 435,  y: 580 },
    "aws-waf":         { x: 535,  y: 580 },
    "aws-alb":         { x: 535,  y: 680 },

    // 하단 AWS Production VPC - 블록 2: Replicated Core Stack (1:1 복제)
    "prod-fe":         { x: 735,  y: 600 },
    "prod-be":         { x: 920,  y: 600 },
    "prod-rds":        { x: 1105, y: 600 },

    // 하단 AWS Production VPC - 블록 3: Database & Storage
    "prod-redis":      { x: 1272, y: 580 },
    "prod-s3":         { x: 1272, y: 680 },

    // 하단 AWS Production VPC - 블록 4: LLM AI (단독 전용 블록)
    "prod-openai":     { x: 1420, y: 620 },

    // 하단 AWS Production VPC - 블록 5: Governance & Ops
    "mgmt-cloudwatch": { x: 1565, y: 580 },
    "mgmt-vpc":        { x: 1565, y: 680 }
  };

  // 2. 세 번째 스크린샷과 100% 동일한 정밀 SVG 아이콘 렌더러
  function renderServiceIcon(id) {
    switch (id) {
      // 프론트엔드 (Next.js) - 화이트 스퀘어클 + 블루 아톰 링
      case "dev-fe":
      case "prod-fe":
        return `
          <g>
            <rect x="-24" y="-24" width="48" height="48" rx="13" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
            <circle cx="0" cy="0" r="4" fill="#0284c7"/>
            <ellipse cx="0" cy="0" rx="13" ry="5.5" fill="none" stroke="#0284c7" stroke-width="1.8" transform="rotate(30)"/>
            <ellipse cx="0" cy="0" rx="13" ry="5.5" fill="none" stroke="#0284c7" stroke-width="1.8" transform="rotate(-30)"/>
          </g>
        `;

      // 백엔드 (FastAPI) - 다크 스퀘어클 + 서버 랙 와이어프레임 + 그린 LED
      case "dev-be":
      case "prod-be":
        return `
          <g>
            <rect x="-24" y="-24" width="48" height="48" rx="13" fill="#1e293b" stroke="#94a3b8" stroke-width="1.2"/>
            <rect x="-12" y="-14" width="24" height="28" rx="2" fill="none" stroke="#ffffff" stroke-width="1.6"/>
            <line x1="-8" y1="-8" x2="8" y2="-8" stroke="#ffffff" stroke-width="1.6"/>
            <line x1="-8" y1="-2" x2="8" y2="-2" stroke="#ffffff" stroke-width="1.6"/>
            <circle cx="5" cy="8" r="1.5" fill="#22c55e"/>
          </g>
        `;

      // 데이터베이스 (RDS PostgreSQL) - 블루 실린더 3단 스택
      case "dev-rds":
      case "prod-rds":
        return `
          <g>
            <rect x="-24" y="-24" width="48" height="48" rx="13" fill="#2563eb" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>
            <ellipse cx="0" cy="-9" rx="11" ry="4" fill="none" stroke="#ffffff" stroke-width="1.8"/>
            <path d="M-11 -9 v9 c0 2.2 5 4 11 4 s11 -1.8 11 -4 v-9" fill="none" stroke="#ffffff" stroke-width="1.8"/>
            <path d="M-11 0 v9 c0 2.2 5 4 11 4 s11 -1.8 11 -4 v-9" fill="none" stroke="#ffffff" stroke-width="1.8"/>
          </g>
        `;

      // Route 53 - 블루 글로벌 쉴드
      case "aws-route53":
        return `
          <g>
            <rect x="-22" y="-22" width="44" height="44" rx="12" fill="#2563eb" stroke="rgba(255,255,255,0.22)"/>
            <circle cx="0" cy="0" r="12" fill="none" stroke="#ffffff" stroke-width="1.8"/>
            <ellipse cx="0" cy="0" rx="5.5" ry="12" fill="none" stroke="#ffffff" stroke-width="1.5"/>
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" stroke-width="1.5"/>
          </g>
        `;

      // AWS WAF - 레드 방패
      case "aws-waf":
        return `
          <g>
            <rect x="-22" y="-22" width="44" height="44" rx="12" fill="#dc2626" stroke="rgba(255,255,255,0.22)"/>
            <path d="M0 -13 l12 5 v9 c0 8 -12 14 -12 14 S-12 9 -12 1 V-8 Z" fill="none" stroke="#ffffff" stroke-width="1.8"/>
            <line x1="-6" y1="-2" x2="6" y2="-2" stroke="#ffffff" stroke-width="1.8"/>
          </g>
        `;

      // Load Balancer (ALB) - 시안/블루 분산 트리
      case "aws-alb":
        return `
          <g>
            <rect x="-22" y="-22" width="44" height="44" rx="12" fill="#0284c7" stroke="rgba(255,255,255,0.22)"/>
            <rect x="-4" y="-12" width="8" height="6" rx="1.5" fill="#ffffff"/>
            <rect x="-12" y="6" width="8" height="6" rx="1.5" fill="#ffffff"/>
            <rect x="4" y="6" width="8" height="6" rx="1.5" fill="#ffffff"/>
            <path d="M0 -6 v6 m-8 6 v-4 h16 v4" stroke="#ffffff" stroke-width="1.8" fill="none"/>
          </g>
        `;

      // ElastiCache Redis - 시안 메모리 블록
      case "prod-redis":
        return `
          <g>
            <rect x="-22" y="-22" width="44" height="44" rx="12" fill="#06b6d4" stroke="rgba(255,255,255,0.22)"/>
            <rect x="-10" y="-10" width="20" height="20" rx="3" fill="none" stroke="#ffffff" stroke-width="2"/>
            <text x="0" y="5" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" text-anchor="middle">M</text>
          </g>
        `;

      // Amazon S3 - 그린 버킷 스토리지
      case "prod-s3":
        return `
          <g>
            <rect x="-22" y="-22" width="44" height="44" rx="12" fill="#16a34a" stroke="rgba(255,255,255,0.22)"/>
            <path d="M-11 -7 l11 -4 l11 4 v14 c0 3 -5 4 -11 4 s-11 -1 -11 -4 Z" fill="none" stroke="#ffffff" stroke-width="1.8"/>
            <ellipse cx="0" cy="-7" rx="11" ry="3.5" fill="none" stroke="#ffffff" stroke-width="1.6"/>
          </g>
        `;

      // OpenAI API - 딥 틸/에메랄드 코어
      case "prod-openai":
        return `
          <g>
            <rect x="-26" y="-26" width="52" height="52" rx="14" fill="#0d9488" stroke="rgba(255,255,255,0.25)" stroke-width="1.4"/>
            <circle cx="0" cy="0" r="11" fill="none" stroke="#ffffff" stroke-width="2"/>
            <circle cx="0" cy="0" r="4" fill="#ffffff"/>
          </g>
        `;

      // CloudWatch - 마젠타 게이지 다이얼
      case "mgmt-cloudwatch":
        return `
          <g>
            <rect x="-22" y="-22" width="44" height="44" rx="12" fill="#db2777" stroke="rgba(255,255,255,0.22)"/>
            <path d="M-10 4 a10 10 0 1 1 20 0" fill="none" stroke="#ffffff" stroke-width="2"/>
            <circle cx="0" cy="4" r="3" fill="#ffffff"/>
          </g>
        `;

      // VPC & NAT - 에메랄드 프라이빗 서브넷 네트워크
      case "mgmt-vpc":
        return `
          <g>
            <rect x="-22" y="-22" width="44" height="44" rx="12" fill="#15803d" stroke="rgba(255,255,255,0.22)"/>
            <circle cx="-7" cy="-7" r="2.5" fill="#ffffff"/>
            <circle cx="7" cy="-7" r="2.5" fill="#ffffff"/>
            <circle cx="0" cy="7" r="2.5" fill="#ffffff"/>
            <path d="M-7 -7 l7 14 l7 -14" stroke="#ffffff" stroke-width="1.6" fill="none"/>
          </g>
        `;

      default:
        return `<rect x="-22" y="-22" width="44" height="44" rx="12" fill="#334155"/>`;
    }
  }

  // 3. 메인 SVG 다이어그램 렌더링 함수
  function renderAppleDiagram() {
    const stage = document.getElementById("diagram-svg-stage");
    if (!stage) return;

    let svg = `
      <svg id="architecture-svg-root" class="architecture-svg" viewBox="0 0 1680 880" width="1680" height="880" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
            text { font-family: -apple-system, BlinkMacSystemFont, "Pretendard Variable", sans-serif; }
            .wire-default { stroke: rgba(148, 163, 184, 0.5); stroke-width: 1.6; fill: none; }
            .wire-dev { stroke: #38bdf8; stroke-dasharray: 6 4; stroke-width: 1.8; fill: none; }
            .wire-https { stroke: #22c55e; stroke-width: 2.2; fill: none; }
            .wire-replica { stroke: #60a5fa; stroke-dasharray: 6 4; stroke-width: 2.2; fill: none; }
            .node-title { font-size: 11.5px; font-weight: 700; fill: #f8fafc; text-anchor: middle; }
            .node-sub { font-size: 10px; font-weight: 500; fill: #94a3b8; text-anchor: middle; }
            .apple-node-anchor { cursor: pointer; transition: transform 0.16s ease, filter 0.16s ease, opacity 0.2s ease; }
            .apple-node-anchor:hover { filter: drop-shadow(0 4px 16px rgba(41, 151, 255, 0.45)); }
          </style>

          <marker id="arr-default" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(148, 163, 184, 0.7)"/>
          </marker>
          <marker id="arr-dev" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8"/>
          </marker>
          <marker id="arr-https" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#22c55e"/>
          </marker>
          <marker id="arr-replica" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#60a5fa"/>
          </marker>

          <!-- AI 도구 전용 그라데이션 -->
          <linearGradient id="grad-chatgpt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#10a37f"/><stop offset="100%" stop-color="#056149"/>
          </linearGradient>
          <linearGradient id="grad-claude" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ea580c"/><stop offset="100%" stop-color="#c2410c"/>
          </linearGradient>
        </defs>

        <!-- 배경 매트 딥 다크 -->
        <rect width="1680" height="880" fill="#0b0f19"/>


        <!-- ============================================================ -->
        <!-- 1. 상단 컨테이너: AWS Dev VPC (코어 3-티어 개발 스택)        -->
        <!-- ============================================================ -->
        <g id="box-dev-vpc" class="vpc-container-group">
          <!-- 외곽 반투명 플레이트 -->
          <rect x="655" y="115" width="530" height="205" rx="16" fill="rgba(30, 41, 59, 0.6)" stroke="#38bdf8" stroke-width="1.4" stroke-dasharray="6 4"/>
          
          <!-- 헤더 뱃지 -->
          <g transform="translate(675, 132)">
            <rect width="115" height="22" rx="5" fill="#0284c7"/>
            <text x="57" y="15" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">AWS Dev VPC</text>
            <text x="125" y="15" fill="#94a3b8" font-size="11.5" font-weight="500">
              [1단계] 개발 검증 코어 스택 (EC2 프론트 + EC2 백엔드 + RDS PostgreSQL)
            </text>
          </g>

          <!-- 내부 코어 그룹 플레이트 -->
          <rect x="675" y="165" width="490" height="135" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        </g>

        <!-- ============================================================ -->
        <!-- 2. 중앙 1:1 복제 회랑 (Replication Sync Bridge)              -->
        <!-- ============================================================ -->
        <g id="replication-sync-bridge">
          <!-- 수직 복제선 (Dev 하단 305 -> Prod 상단 테두리 445: 텍스트 충돌 원천 방지) -->
          <line x1="735" y1="305" x2="735" y2="445" class="wire-replica" marker-end="url(#arr-replica)"/>
          <line x1="920" y1="305" x2="920" y2="445" class="wire-replica" marker-end="url(#arr-replica)"/>
          <line x1="1105" y1="305" x2="1105" y2="445" class="wire-replica" marker-end="url(#arr-replica)"/>

          <!-- 회랑 단독 플로팅 알약 뱃지 (선과 겹치지 않고 정돈된 배치) -->
          <g transform="translate(735, 375)">
            <rect x="-42" y="-10" width="84" height="20" rx="5" fill="#0f172a" stroke="#60a5fa" stroke-width="1.1"/>
            <text x="0" y="3.5" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">1:1 UI 복제</text>
          </g>

          <g transform="translate(920, 375)">
            <rect x="-42" y="-10" width="84" height="20" rx="5" fill="#0f172a" stroke="#60a5fa" stroke-width="1.1"/>
            <text x="0" y="3.5" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">1:1 API 복제</text>
          </g>

          <g transform="translate(1105, 375)">
            <rect x="-50" y="-10" width="100" height="20" rx="5" fill="#0f172a" stroke="#60a5fa" stroke-width="1.1"/>
            <text x="0" y="3.5" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">DB 스냅샷 이관</text>
          </g>
        </g>

        <!-- ============================================================ -->
        <!-- 3. 하단 컨테이너: AWS Production VPC (세 번째 스샷의 5-블록 통합) -->
        <!-- ============================================================ -->
        <g id="box-prod-vpc" class="vpc-container-group">
          <!-- 마스터 외곽 바운딩 박스 (x: 365, 좌측 3D 영역과 여유 공간 확보) -->
          <rect x="365" y="445" width="1280" height="340" rx="18" fill="#0f172a" stroke="#3b82f6" stroke-width="1.6"/>
          
          <!-- Prod VPC 헤더 -->
          <g transform="translate(390, 465)">
            <rect width="165" height="24" rx="5" fill="#2563eb"/>
            <text x="82" y="16" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">AWS Production VPC</text>
            <text x="178" y="16" fill="#94a3b8" font-size="12" font-weight="500">
              [2단계] 본 운영 확장 임대망 (1:1 복제 코어 서버 + 인그레스 보호 + DB/스토리지 + LLM AI + 거버넌스)
            </text>
          </g>

          <!-- [블록 1] Ingress & Protection (좌측 정규 보안 인그레스) -->
          <g id="block-ingress">
            <rect x="385" y="500" width="250" height="260" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
            <text x="510" y="525" fill="#f8fafc" font-size="12" font-weight="700" text-anchor="middle">
              Ingress &amp; Protection
            </text>
          </g>

          <!-- [블록 2] Replicated Core Stack (중앙 1:1 복제 코어 스택) -->
          <g id="block-core-replicated">
            <rect x="655" y="500" width="530" height="260" rx="12" fill="#1e293b" stroke="#60a5fa" stroke-width="1.8"/>
            <g transform="translate(775, 524)">
              <rect x="-105" y="-11" width="210" height="22" rx="5" fill="rgba(96, 165, 250, 0.15)" stroke="#60a5fa" stroke-width="1"/>
              <text x="0" y="3.5" fill="#60a5fa" font-size="11" font-weight="800" text-anchor="middle">
                Replicated Core Stack (1:1 복제)
              </text>
            </g>
          </g>

          <!-- [블록 3] Database & Storage (고속 인메모리 캐시 & 도면 스토리지) -->
          <g id="block-db-storage">
            <rect x="1205" y="500" width="135" height="260" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
            <text x="1272" y="525" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">
              Database &amp; Storage
            </text>
          </g>

          <!-- [블록 4] LLM AI (단독 전용 연동 블록) -->
          <g id="block-llm-ai">
            <rect x="1355" y="500" width="130" height="260" rx="12" fill="#1e293b" stroke="#10a37f" stroke-width="1.4"/>
            <g transform="translate(1420, 525)">
              <rect x="-42" y="-11" width="84" height="20" rx="4" fill="rgba(16, 163, 127, 0.2)" stroke="#10a37f" stroke-width="1"/>
              <text x="0" y="3" fill="#10a37f" font-size="11.5" font-weight="800" text-anchor="middle">
                LLM AI
              </text>
            </g>
          </g>

          <!-- [블록 5] Governance & Ops (관제 및 망분리 거버넌스) -->
          <g id="block-governance-ops">
            <rect x="1500" y="500" width="130" height="260" rx="12" fill="#1e293b" stroke="#bf5af2" stroke-width="1"/>
            <text x="1565" y="525" fill="#bf5af2" font-size="11" font-weight="700" text-anchor="middle">
              Governance &amp; Ops
            </text>
          </g>
        </g>

        <!-- ============================================================ -->
        <!-- 4. 커넥터 배선 레이어 (Wires & Labels)                       -->
        <!-- ============================================================ -->
        <g id="layer-runtime-wires">
          <!-- 4-A. 개발망 전용 배선 그룹 (wires-dev) -->
          <g id="wires-dev">
            <!-- Dev: Developer -> Dev FE 직결선 -->
            <path d="M 238 215 L 655 215 L 705 215" class="wire-dev" marker-end="url(#arr-dev)"/>
            <g transform="translate(450, 205)">
              <rect x="-55" y="-10" width="110" height="20" rx="4" fill="#181308" stroke="rgba(255, 159, 10, 0.6)" stroke-width="1"/>
              <text x="0" y="3.5" fill="#fed7aa" font-size="10" font-weight="700" text-anchor="middle">SSH 직결 코딩</text>
            </g>

            <!-- Dev Core: FE -> BE (/api) -->
            <line x1="759" y1="215" x2="890" y2="215" class="wire-default" marker-end="url(#arr-default)"/>
            <g transform="translate(824, 215)">
              <rect x="-20" y="-9" width="40" height="18" rx="4" fill="#0b1021" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1"/>
              <text x="0" y="3.5" fill="#f8fafc" font-size="9.5" font-weight="700" text-anchor="middle">/api</text>
            </g>

            <!-- Dev Core: BE -> RDS (SQL :5432) -->
            <line x1="944" y1="215" x2="1075" y2="215" class="wire-default" marker-end="url(#arr-default)"/>
            <g transform="translate(1009, 215)">
              <rect x="-35" y="-9" width="70" height="18" rx="4" fill="#0b1021" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1"/>
              <text x="0" y="3.5" fill="#f8fafc" font-size="9.5" font-weight="700" text-anchor="middle">SQL :5432</text>
            </g>
          </g>

          <!-- 4-B. 운영망 전용 배선 그룹 (wires-prod) -->
          <g id="wires-prod">
            <!-- Users -> Route 53 (HTTPS 실운영 접속: 테이블 끝 x=254 -> Route 53 x=407, 뱃지 x=320) -->
            <line x1="254" y1="580" x2="407" y2="580" class="wire-https" marker-end="url(#arr-https)"/>
            <g transform="translate(320, 570)">
              <rect x="-26" y="-10" width="52" height="20" rx="4" fill="#15803d"/>
              <text x="0" y="4" fill="#ffffff" font-size="10.5" font-weight="700" text-anchor="middle">HTTPS</text>
            </g>

            <!-- Ingress Flow: Route 53 -> WAF -> ALB -->
            <line x1="457" y1="580" x2="507" y2="580" class="wire-default" marker-end="url(#arr-default)"/>
            <line x1="535" y1="602" x2="535" y2="652" class="wire-default" marker-end="url(#arr-default)"/>
            
            <!-- ALB -> Prod FE 분산 인입 -->
            <path d="M 557 680 L 640 680 L 640 600 L 705 600" class="wire-default" marker-end="url(#arr-default)"/>

            <!-- Prod Core: FE -> BE (/api) -->
            <line x1="759" y1="600" x2="890" y2="600" class="wire-default" marker-end="url(#arr-default)"/>
            <g transform="translate(824, 600)">
              <rect x="-20" y="-9" width="40" height="18" rx="4" fill="#0b1021" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1"/>
              <text x="0" y="3.5" fill="#f8fafc" font-size="9.5" font-weight="700" text-anchor="middle">/api</text>
            </g>

            <!-- Prod Core: BE -> RDS (SQL :5432) -->
            <line x1="944" y1="600" x2="1075" y2="600" class="wire-default" marker-end="url(#arr-default)"/>
            <g transform="translate(1009, 600)">
              <rect x="-35" y="-9" width="70" height="18" rx="4" fill="#0b1021" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1"/>
              <text x="0" y="3.5" fill="#f8fafc" font-size="9.5" font-weight="700" text-anchor="middle">SQL :5432</text>
            </g>

            <!-- Prod BE -> Database & Storage (Redis, S3) 클린 바닥 버스 (y=745) -->
            <path d="M 920 624 L 920 745 L 1225 745 L 1225 580 L 1246 580" class="wire-default" marker-end="url(#arr-default)"/>
            <path d="M 1225 745 L 1225 680 L 1246 680" class="wire-default" marker-end="url(#arr-default)"/>

            <!-- Prod BE -> LLM AI (OpenAI API) 클린 바닥 버스 (y=745) -->
            <path d="M 1225 745 L 1375 745 L 1375 620 L 1390 620" class="wire-default" marker-end="url(#arr-default)"/>
          </g>
        </g>

        <!-- ============================================================ -->
        <!-- 5. 인터랙티브 노드 레이어 (클릭 시 서랍 연동)               -->
        <!-- ============================================================ -->
        <g id="layer-interactive-nodes">
          <!-- A. 개발자 3D 그룹 (Developer + ChatGPT + Claude Code 3D 누끼 렌더링 + 벡터 텍스트) -->
          <g id="node-user-dev" class="apple-node-anchor" data-node-id="user-dev">
            <image href="./asset_developer_3d.png" x="10" y="70" width="308" height="234" />
            <text x="150" y="324" class="node-title" font-size="13">Developer</text>
            <text x="150" y="340" class="node-sub" font-size="11">ChatGPT &amp; Claude Code 직결</text>
          </g>

          <!-- B. 실운영 사용자 3D 그룹 (Users: 사내 경영진 / 구매팀 3D 누끼 렌더링 + 벡터 텍스트) -->
          <g id="node-user-client" class="apple-node-anchor" data-node-id="user-client">
            <image href="./asset_users_3d.png" x="15" y="455" width="253" height="222" />
            <text x="145" y="698" class="node-title" font-size="13">Users</text>
            <text x="145" y="715" class="node-sub" font-size="11">(사내 경영진 / 구매팀)</text>
          </g>
    `;

    // C. 클라우드 서비스 노드 렌더링 (COORDS 기준 자동 순회)
    const serviceNodeList = [
      // Dev VPC Core
      { id: "dev-fe", title: "EC2 Frontend", sub: "(t3.small)" },
      { id: "dev-be", title: "EC2 Backend", sub: "(t3.medium)" },
      { id: "dev-rds", title: "RDS PostgreSQL", sub: "(db.t3.small)" },

      // Prod VPC - Ingress & Protection
      { id: "aws-route53", title: "Route 53", sub: "DNS 라우팅" },
      { id: "aws-waf", title: "AWS WAF", sub: "웹 보안 방화벽" },
      { id: "aws-alb", title: "Load Balancer", sub: "부하분산" },

      // Prod VPC - Replicated Core
      { id: "prod-fe", title: "EC2 Frontend", sub: "(t3.small)" },
      { id: "prod-be", title: "EC2 Backend", sub: "(t3.medium)" },
      { id: "prod-rds", title: "RDS PostgreSQL", sub: "(db.t3.small)" },

      // Prod VPC - Database & Storage
      { id: "prod-redis", title: "ElastiCache", sub: "Redis 캐시" },
      { id: "prod-s3", title: "Amazon S3", sub: "BOM·도면 스토리지" },

      // Prod VPC - LLM AI
      { id: "prod-openai", title: "OpenAI API", sub: "(ChatGPT 연동)" },

      // Prod VPC - Governance & Ops
      { id: "mgmt-cloudwatch", title: "CloudWatch", sub: "실시간 모니터링" },
      { id: "mgmt-vpc", title: "VPC & NAT", sub: "보안 서브넷" }
    ];

    serviceNodeList.forEach((n) => {
      const pt = COORDS[n.id];
      if (!pt) return;

      const iconMarkup = renderServiceIcon(n.id);
      svg += `
        <g id="node-${n.id}" class="apple-node-anchor" data-node-id="${n.id}" transform="translate(${pt.x}, ${pt.y})">
          ${iconMarkup}
          <text x="0" y="38" class="node-title">${n.title}</text>
          <text x="0" y="52" class="node-sub">${n.sub}</text>
        </g>
      `;
    });

    svg += `
        </g>
      </svg>
    `;

    stage.innerHTML = svg;

    // 노드 클릭 시 우측 서랍(Drawer) 열기 바인딩
    document.querySelectorAll(".apple-node-anchor").forEach((nodeEl) => {
      nodeEl.addEventListener("click", () => {
        const nodeId = nodeEl.getAttribute("data-node-id");
        openAppleDrawer(nodeId);
      });
    });
  }

  // 4. 우측 상세 스펙 서랍(Drawer) 제어
  function openAppleDrawer(nodeId) {
    const node = data.nodes[nodeId];
    if (!node) return;

    const drawer = document.getElementById("apple-drawer");
    if (!drawer) return;

    drawer.innerHTML = `
      <div class="drawer-top-bar">
        <div>
          <h2>${node.name}</h2>
          <p>${node.subTitle}</p>
        </div>
        <button type="button" class="btn-drawer-close" id="btn-drawer-close" title="닫기">&times;</button>
      </div>
      <div class="drawer-content-pane">
        <div class="drawer-section-card">
          <h4>서비스 역할 및 맥락</h4>
          <p>${node.desc}</p>
        </div>
        ${node.specs ? `
        <div class="drawer-section-card">
          <h4>클라우드 리소스 및 인프라 사양</h4>
          <p style="font-family:'JetBrains Mono', monospace; font-size:0.85rem; color:var(--apple-blue); font-weight:700;">
            ${node.specs}
          </p>
        </div>
        ` : ''}
        <div class="drawer-section-card">
          <h4>아키텍처 계층 및 환경</h4>
          <p style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:var(--apple-teal);">
            Tier: ${node.tier.toUpperCase()} · Env: ${(node.env || 'SHARED').toUpperCase()}
          </p>
        </div>
      </div>
    `;

    drawer.classList.add("open");

    const closeBtn = document.getElementById("btn-drawer-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => drawer.classList.remove("open"));
    }
  }

  // 5. 모드 전환 필터 & 사용자 인터랙션 바인딩
  function initControls() {
    // 세그먼트 탭 필터 (전체 / 개발 / 운영)
    document.querySelectorAll(".seg-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".seg-tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.getAttribute("data-mode");
        applyFilter(mode);
      });
    });

    // ESC 키로 서랍 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const drawer = document.getElementById("apple-drawer");
        if (drawer) drawer.classList.remove("open");
      }
    });

    // 외부 클릭 시 서랍 닫기
    document.addEventListener("click", (e) => {
      const drawer = document.getElementById("apple-drawer");
      if (drawer && drawer.classList.contains("open")) {
        if (!drawer.contains(e.target) && !e.target.closest(".apple-node-anchor")) {
          drawer.classList.remove("open");
        }
      }
    });
  }

  // 6. 필터 모드 적용 (개발망/운영망 포커싱)
  function applyFilter(mode) {
    const devIds = ["user-dev", "dev-fe", "dev-be", "dev-rds"];
    const prodIds = [
      "user-client",
      "aws-route53",
      "aws-waf",
      "aws-alb",
      "prod-fe",
      "prod-be",
      "prod-rds",
      "prod-redis",
      "prod-s3",
      "prod-openai",
      "mgmt-cloudwatch",
      "mgmt-vpc"
    ];

    const devBox = document.getElementById("box-dev-vpc");
    const prodBox = document.getElementById("box-prod-vpc");
    const replicaBridge = document.getElementById("replication-sync-bridge");
    const wiresDev = document.getElementById("wires-dev");
    const wiresProd = document.getElementById("wires-prod");

    if (mode === "dev") {
      // 1. 개발 환경 모드: Dev는 선명하게(1.0), Prod 및 복제 브릿지는 비활성화(0.12)
      if (devBox) devBox.style.opacity = "1";
      if (wiresDev) wiresDev.style.opacity = "1";

      if (prodBox) prodBox.style.opacity = "0.12";
      if (wiresProd) wiresProd.style.opacity = "0.12";
      if (replicaBridge) replicaBridge.style.opacity = "0.12";

      document.querySelectorAll(".apple-node-anchor").forEach((el) => {
        const id = el.getAttribute("data-node-id");
        el.style.opacity = devIds.includes(id) ? "1" : "0.12";
      });
    } else if (mode === "prod") {
      // 2. 운영 환경 모드: Prod는 선명하게(1.0), Dev 및 복제 브릿지는 비활성화(0.12)
      if (devBox) devBox.style.opacity = "0.12";
      if (wiresDev) wiresDev.style.opacity = "0.12";
      if (replicaBridge) replicaBridge.style.opacity = "0.12";

      if (prodBox) prodBox.style.opacity = "1";
      if (wiresProd) wiresProd.style.opacity = "1";

      document.querySelectorAll(".apple-node-anchor").forEach((el) => {
        const id = el.getAttribute("data-node-id");
        el.style.opacity = prodIds.includes(id) ? "1" : "0.12";
      });
    } else {
      // 3. 전체 아키텍처: 전체 선명하게(1.0)
      if (devBox) devBox.style.opacity = "1";
      if (wiresDev) wiresDev.style.opacity = "1";
      if (replicaBridge) replicaBridge.style.opacity = "1";
      if (prodBox) prodBox.style.opacity = "1";
      if (wiresProd) wiresProd.style.opacity = "1";

      document.querySelectorAll(".apple-node-anchor").forEach((el) => {
        el.style.opacity = "1";
      });
    }
  }

  // 7. 애플리케이션 초기 기동
  document.addEventListener("DOMContentLoaded", () => {
    renderAppleDiagram();
    initControls();
  });
})();
