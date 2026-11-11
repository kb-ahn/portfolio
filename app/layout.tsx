import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "안기배 | UI/UX를 이해하는 풀스택 개발자",
  description:
    "디자인 전공 풀스택 개발자 안기배 — 퍼블리싱 화면의 React 컴포넌트화부터 NestJS · PostgreSQL 백엔드, 배포까지",
  openGraph: {
    title: "안기배 | UI/UX를 이해하는 풀스택 개발자",
    description: "디자이너의 눈으로 화면을 보고, 개발자의 손으로 끝까지 만듭니다",
    images: ["/img/hero.jpg"],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
