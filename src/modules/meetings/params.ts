import { DEFAULT_PAGE, meetingStatuses } from "@/constants"
import { createLoader, parseAsString, parseAsInteger, parseAsStringEnum } from "nuqs/server"

export const filterSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum([...meetingStatuses]),
  agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
}

export const loadSearchParams = createLoader(filterSearchParams)