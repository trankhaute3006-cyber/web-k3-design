import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Xuat ra HTML tinh -> chay duoc tren Hostinger shared hosting (LiteSpeed/Apache)
  output: "export",
  // /gioi-thieu/ -> /gioi-thieu/index.html : bat buoc cho Apache/LiteSpeed
  trailingSlash: true,
  images: {
    // Hostinger shared khong co Node runtime -> tat toi uu anh phia server
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
