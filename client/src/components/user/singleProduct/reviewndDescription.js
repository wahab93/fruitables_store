import React from 'react'

export const ReviewndDescription = () => {
    return (
        <div className="col-lg-12">
            <nav>
                <div className="nav nav-tabs mb-3">
                    <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                        id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                        aria-controls="nav-about" aria-selected="true">Description</button>
                    <button className="nav-link border-white border-bottom-0" type="button" role="tab"
                        id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                        aria-controls="nav-mission" aria-selected="false">Reviews</button>
                </div>
            </nav>
            <div className="tab-content mb-5">
                <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                    <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.
                        Susp endisse ultricies nisi vel quam suscipit </p>
                    <p>Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish filefish Antarctic
                        icefish goldeye aholehole trumpetfish pilot fish airbreathing catfish, electric ray sweeper.</p>
                    <div className="px-2">
                        <div className="row g-4">
                            <div className="col-6">
                                <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                    <div className="col-6">
                                        <p className="mb-0">Weight</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-0">1 kg</p>
                                    </div>
                                </div>
                                <div className="row text-center align-items-center justify-content-center py-2">
                                    <div className="col-6">
                                        <p className="mb-0">Country of Origin</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-0">Agro Farm</p>
                                    </div>
                                </div>
                                <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                    <div className="col-6">
                                        <p className="mb-0">Quality</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-0">Organic</p>
                                    </div>
                                </div>
                                <div className="row text-center align-items-center justify-content-center py-2">
                                    <div className="col-6">
                                        <p className="mb-0">Сheck</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-0">Healthy</p>
                                    </div>
                                </div>
                                <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                    <div className="col-6">
                                        <p className="mb-0">Min Weight</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-0">250 Kg</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                    <div className="d-flex">
                        <img src="/images/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: '100px', height: '100px' }} alt="" />
                        <div className="">
                            <p className="mb-2" style={{ fontSize: '14px' }}>April 12, 2024</p>
                            <div className="d-flex justify-content-between">
                                <h5>Jason Smith</h5>
                                <div className="d-flex mb-3">
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                            <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <img src="/images/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: '100px', height: '100px' }} alt="" />
                        <div className="">
                            <p className="mb-2" style={{ fontSize: '14px' }}>April 12, 2024</p>
                            <div className="d-flex justify-content-between">
                                <h5>Sam Peters</h5>
                                <div className="d-flex mb-3">
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                            <p className="text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                        </div>
                    </div>
                </div>
                <div className="tab-pane" id="nav-vision" role="tabpanel">
                    <p className="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                        amet diam et eos labore. 3</p>
                    <p className="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                        Clita erat ipsum et lorem et sit</p>
                </div>
            </div>
        </div>
    )
}
