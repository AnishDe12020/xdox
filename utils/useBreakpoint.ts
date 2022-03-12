import create from "@kodingdotninja/use-tailwind-breakpoint";
import resolveConfig from "tailwindcss/resolveConfig";
import { TailwindThemeValue } from "tailwindcss/tailwind-config";

import tailwindConfig from "../tailwind.config";

const config = resolveConfig(tailwindConfig);

const { useBreakpoint } = create(config.theme.screens as TailwindThemeValue);

export default useBreakpoint;
