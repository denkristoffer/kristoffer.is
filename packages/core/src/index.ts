import "module-alias/register";
import { addAlias } from "module-alias";
import { join } from "path";

addAlias("@kristoffer.is/writing", join(__dirname, "../../writing"));

import "./app";
