import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider, theme, ThemeConfig } from 'antd';

const { darkAlgorithm } = theme;
const themeConfig: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    fontSize: 16,
    colorPrimary: '#5d5fbd',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={themeConfig}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
