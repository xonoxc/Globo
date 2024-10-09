import { ReactNode } from "react"
import { Provider } from "react-redux"
import store from "../../store/store"
import { ProfileContextProvider } from "../../hooks/useProfile"
import { SubscriptionProvider } from "../../hooks/useSubscription"
import { StatsContextProvider } from "../../hooks/useStats"

interface ContextWrapperProps {
	children: ReactNode
}

const ContextWrapper = ({ children }: ContextWrapperProps) => {
	return (
		<Provider store={store}>
			<ProfileContextProvider>
				<SubscriptionProvider>
					<StatsContextProvider>{children}</StatsContextProvider>
				</SubscriptionProvider>
			</ProfileContextProvider>
		</Provider>
	)
}

export default ContextWrapper
