import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { AuthProvider, FirestoreProvider, StorageProvider, useFirebaseApp } from "reactfire"

interface Props {
    children: React.ReactNode
}

const FirebaseServices = ({children}: Props) => {

  const app = useFirebaseApp()
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const store = getStorage(app)

  return (
    <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>
            <StorageProvider sdk={store}>
                {children}
            </StorageProvider>
        </FirestoreProvider>
    </AuthProvider>
  )
}

export default FirebaseServices