import { ReactElement } from 'react'
import Head from "next/head"
import FrontendLayout from "@components/frontend.layout"
import { GetServerSideProps } from "next"
import { fetchWrapper } from "@utils/fetch-wrapper"
import UserChangePassword from "@components/view/users/user.changePassword";
import { IUser } from "@models/user";

interface IChangePassword {
    user: IUser
}

const ChangePassword = ({user}: IChangePassword) =>  {

    return (
        <>
            <Head>
                <title>Genius - Student Management System made simple for small businesses</title>
                <meta
                    name="description"
                    content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
                />
            </Head>
            <main>
                <UserChangePassword user={user}/>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token } = context.query
    const CryptoJS = require("crypto-js");
    const secret = process.env.SECRET
    let user = null
    try {
        const bytes  = CryptoJS.AES.decrypt(token, secret);
        const email = bytes.toString(CryptoJS.enc.Utf8);

        const api = `/userLists?email=${email}`
        const users = await fetchWrapper.fetchData({path: api}).then(res => res.data)
        user = users[0]
    } catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }


    if (user?.email_verified_at) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }

    // Pass data to the page via props
    return {props: {user: user}}
}

ChangePassword.getLayout = function getLayout(page: ReactElement) {
    return (
        <FrontendLayout title="Website">
            {page}
        </FrontendLayout>
    )
}

export default ChangePassword
