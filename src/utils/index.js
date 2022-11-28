import axios from './axios'
export const get = axios.get
export const post = axios.post
import { baseUrl } from '@/config'
const MODE = import.meta.env.MODE 
export const typeMap = {
    "634b80a8ed19fe7848c2e638": {
      icon: 'icon-gouwu-2'
    },
    "634b80caed19fe7848c2e63a": {
      icon: 'icon-yinliao'
    },
    "634b80d5ed19fe7848c2e63c": {
      icon: 'icon-burger'
    },
    "634b80dded19fe7848c2e63e": {
      icon: 'icon-jiaotongbaoxiao'
    },
    "634b80e1ed19fe7848c2e640": {
      icon: 'icon-fangwuzushou'
    },
    "634b80e6ed19fe7848c2e642": {
      icon: 'icon-diannao'
    },
    "634b80eced19fe7848c2e644": {
      icon: 'icon-HouseholdCarbonFootprint'
    },
    "634b80f2ed19fe7848c2e646": {
      icon: 'icon-gasstation'
    },
    "634b80f9ed19fe7848c2e648": {
      icon: 'icon-kouhong'
    },
    "634b8102ed19fe7848c2e64a": {
      icon: 'icon-medicine-chest'
    },
    "634b8105ed19fe7848c2e64c": {
      icon: 'icon-liwu1'
    },
    "634b810aed19fe7848c2e64e": {
      icon: 'icon-wenju'
    },
    "634b810fed19fe7848c2e650": {
      icon: 'icon-WagesandSalaries'
    },
    "634b8114ed19fe7848c2e652": {
      icon: 'icon-chuqianguan'
    },
    "634b811bed19fe7848c2e654": {
      icon: 'icon-meijin'
    },
    "634b8121ed19fe7848c2e656": {
      icon: 'icon-qita'
    }
    
  }

  export const imgUrlTrans = (url) => {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `${MODE == 'development' ? 'http://127.0.0.1:7001' : baseUrl}${url}`
      return url
    }
  }