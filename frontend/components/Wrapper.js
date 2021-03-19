import Footer from './Footer'
import Header from './Header'

export function Wrapper({ children, user }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}