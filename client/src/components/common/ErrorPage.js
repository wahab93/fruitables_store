import React from 'react'
import { Link } from 'react-router-dom'
export const ErrorPage = () => {
    return (
        <>
            <section className='my-md-5 py-md-5'>
                <div className="container shadow p-5 my-md-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>Error Page 404</h1>
                            <Link className='btn btn-primary mt-3' to='/'>Back to Home</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
