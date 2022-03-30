import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { ApolloProviderWrapper } from "../lib/apolloClient";
import { Toaster } from "react-hot-toast";
import { UnauthenticatedApolloProviderWrapper } from "../lib/apolloClientUnauthenticated";
import NextNProgress from "nextjs-progressbar";
import DefaultSEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";

const publicPages = [
  "/",
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
  "/[username]",
  "/[username]/[challengeId]",
  "/[username]/[challengeId]/[day]",
];

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "#333333",
            color: "#ffffff",
            minWidth: "250px",
          },
          position: "top-right",
        }}
      />
      <DefaultSeo {...DefaultSEO} />
      <Header />
      <NextNProgress color="#2563eb" options={{ showSpinner: false }} />
      {isPublicPage ? (
        <UnauthenticatedApolloProviderWrapper>
          <Component {...pageProps} />
        </UnauthenticatedApolloProviderWrapper>
      ) : (
        <>
          <SignedIn>
            <ApolloProviderWrapper>
              <Component {...pageProps} />
            </ApolloProviderWrapper>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn redirectUrl={pathname} />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}
export default MyApp;
