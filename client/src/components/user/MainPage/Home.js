import React from 'react'
import { Banner } from './Banner'
import { OurFeatures } from './ourFeatures'
import { Productscarousel } from './productscarousel'
import { Testimonialscarousel } from './testimonialscarousel'
import { Products } from '../products/products'

export const Home = () => {
  return (
    <>
      <Banner />
      <OurFeatures />
      <Products showsidebar={false} />
      <Productscarousel />
      <Testimonialscarousel />
    </>
  )
}
