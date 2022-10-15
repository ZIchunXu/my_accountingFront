import axios from './axios'
export const get = axios.get
export const post = axios.post
import { baseUrl } from '@/config'
const MODE = import.meta.env.MODE 
export const typeMap = {
    "6347af46e7eb3c55745536ce": {
      icon: 'icon-gouwu-2'
    },
    "6347af53e7eb3c55745536d0": {
      icon: 'icon-yinliao'
    },
    "6347af5ae7eb3c55745536d2": {
      icon: 'icon-burger'
    },
    "6347af67e7eb3c55745536d4": {
      icon: 'icon-jiaotongbaoxiao'
    },
    "6347af6de7eb3c55745536d6": {
      icon: 'icon-fangwuzushou'
    },
    "6347af73e7eb3c55745536d8": {
      icon: 'icon-diannao'
    },
    "6347af79e7eb3c55745536da": {
      icon: 'icon-HouseholdCarbonFootprint'
    },
    "6347af7ee7eb3c55745536dc": {
      icon: 'icon-gasstation'
    },
    "6347af88e7eb3c55745536de": {
      icon: 'icon-kouhong'
    },
    "6347af8fe7eb3c55745536e0": {
      icon: 'icon-medicine-chest'
    },
    "6347af95e7eb3c55745536e2": {
      icon: 'icon-liwu1'
    },
    "6347af9ae7eb3c55745536e4": {
      icon: 'icon-wenju'
    },
    "6347af9fe7eb3c55745536e6": {
      icon: 'icon-WagesandSalaries'
    },
    "6347afaee7eb3c55745536e8": {
      icon: 'icon-chuqianguan'
    },
    "6347afb4e7eb3c55745536ea": {
      icon: 'icon-meijin'
    },
    "6347afbce7eb3c55745536ec": {
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