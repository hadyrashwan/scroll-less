import { auth } from "@/auth"

import Link from "next/link"

export default async function LoggedIn() {

    const session = await auth()

    return (

        <div>
        <h2> Welcome {  session?.user?.email} </h2>

        <Link href='/profile'> My Profile </Link>
        </div>
    )
  }