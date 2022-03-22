import create from "@kodingdotninja/use-tailwind-breakpoint";
import resolveConfig from "tailwindcss/resolveConfig";
import { TailwindConfig, TailwindThemeValue } from "tailwindcss/tailwind-config";

import tailwindConfig from "../tailwind.config";

const config = resolveConfig(tailwindConfig as unknown as TailwindConfig);

const { useBreakpoint } = create(config.theme.screens as TailwindThemeValue);

export default useBreakpoint;
