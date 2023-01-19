export default function Page() {
    return (
        <div>
            <h1>Hello, Next.js!</h1>

            <div>
                {/* eslint-disable */}
                <a className="button inline-block" href="/api/auth/logout">
                    Logout
                </a>
            </div>
        </div>
    );
}
