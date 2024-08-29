import React from 'react'

export const ProductCategories = () => {
    return (
        <div className="col-lg-12">
            <div className="mb-4">
                <h4>Categories</h4>
                <ul className="list-unstyled fruite-categorie">
                    <li>
                        <div className="d-flex justify-content-between fruite-name">
                            <a href="#"><i className="fas fa-apple-alt me-2"></i>Apples</a>
                            <span>(3)</span>
                        </div>
                    </li>
                    <li>
                        <div className="d-flex justify-content-between fruite-name">
                            <a href="#"><i className="fas fa-apple-alt me-2"></i>Oranges</a>
                            <span>(5)</span>
                        </div>
                    </li>
                    <li>
                        <div className="d-flex justify-content-between fruite-name">
                            <a href="#"><i className="fas fa-apple-alt me-2"></i>Strawbery</a>
                            <span>(2)</span>
                        </div>
                    </li>
                    <li>
                        <div className="d-flex justify-content-between fruite-name">
                            <a href="#"><i className="fas fa-apple-alt me-2"></i>Banana</a>
                            <span>(8)</span>
                        </div>
                    </li>
                    <li>
                        <div className="d-flex justify-content-between fruite-name">
                            <a href="#"><i className="fas fa-apple-alt me-2"></i>Pumpkin</a>
                            <span>(5)</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
