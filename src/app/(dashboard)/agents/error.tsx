'use client'

import { ErrorState } from '@/components/error-state'

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return <ErrorState title="Faild to load agents" description={error.message} reset={reset} />
}

export default Error