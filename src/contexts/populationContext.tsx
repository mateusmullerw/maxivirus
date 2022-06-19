import React, {createContext, useEffect, useState} from 'react';
import { api } from '../api/axios';

export type Survival = "All" | "Survivor" | "Infected";
type Filters = {
    name: string;
    survival: Survival;
    state: string;
}

const initialFilters: Filters = {
    name: "",
    survival: "All",
    state: "All States",
}

type InfectedByUser = {
    id: string
}

type RawCitzenInfo = {
    gender: string,
    name: {
        title: string,
        first: string,
        last: string
    },
    location: {
        street: {
            number: number,
            name: string
        },
        city: string,
        state: string,
        country: string,
        postcode: number,
    },
    email: string,
    dob: {
        date: string,
        age: number
    },
    registered: {
        date: string,
        age: number
    },
    phone: string,
    cell: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string,
    },
    nat: string
}

type RawData = {
    results: RawCitzenInfo[],
}

export interface CitizenInfo extends RawCitzenInfo{
    id: string,
    infected: boolean,
}

export interface PopulationData {
    [key: string]: CitizenInfo[];
 }

const initialPopulationData: CitizenInfo[] = [];

type PopulationContextType={
    loading: boolean,
    currentPageData: CitizenInfo[],
    page: number,
    setPage: Function,
    pageSize: number,
    setPageSize: Function,
    filters: Filters,
    setFilters: Function,
    setInfected: Function,
    setNationality: Function,
    numberOfPages: number,
}

const initialValue: PopulationContextType = {
    loading: true,
    currentPageData: [],
    page: 1,
    setPage: ()=>{},
    pageSize: 10,
    setPageSize: ()=>{},
    filters: initialFilters,
    setFilters: ()=>{},
    setInfected: ()=>{},
    setNationality: ()=>{},
    numberOfPages: 1,
}
export const PopulationContext = createContext<PopulationContextType>(initialValue)

type PopulationProviderProps = {
    children: React.ReactNode,
}
const PopulationProvider = (props: PopulationProviderProps) => {
    const resultsNumber = 500;
    const seed = "zombies"

    const [loading, setLoading] = useState(initialValue.loading)
    const [populationData, setPopulationData] = useState(initialPopulationData)
    const [filteredData, setFilteredData] = useState(initialPopulationData)
    const [currentPageData, setCurrentPageData] = useState(initialPopulationData)
    const [page, setPage] = useState(initialValue.page)
    const [pageSize, setPageSize] = useState(initialValue.pageSize)
    const [nationality, setNationality] = useState("br")
    const [infectedByUser, setInfectedByUser] = useState<InfectedByUser[]>([])
    const [filters, setFilters] = useState<Filters>(initialFilters)

    const mapRawData = (rawData: RawData) => {
        const processedData = rawData.results.map((citzen) => {
            let infected = citzen.location.postcode % 3 > 0
            const wasInfectedByUser = infectedByUser.find(item => item.id === citzen.email)
            if(wasInfectedByUser){
                infected = true;
            }
            return({...citzen, id: citzen.email, infected: infected})
        })
        return processedData
    }

    const getPopulationData = () => {
        setLoading(true)
        api.get(`/?seed=${seed}&results=${resultsNumber}&nat=${nationality}&exc=login,id,timezone,&noinfo`)
        .then((response) =>{ 
            const processedData = mapRawData(response.data)
            setPopulationData(processedData)
            setLoading(false)
        })
        .catch((err) => {
          console.error("Something went wrong:" + err);
        });
    }

    useEffect(()=>{
        getCurrentPageData()
    }, [filteredData])

    const getCurrentPageData = () => {
        const firstIndex = (page - 1) * pageSize;   
        const lastIndex = firstIndex + pageSize;
        const newPage = filteredData.slice(firstIndex, lastIndex)
        setCurrentPageData(newPage)
    }

    useEffect(()=>{
        let newFilteredData = populationData
        if(filters.survival === "Survivor"){
            newFilteredData = populationData.filter(item => !item.infected)
        }
        if(filters.survival === "Infected"){
            newFilteredData = populationData.filter(item => item.infected)
        }

        if(filters.state !== "All States"){
        newFilteredData = newFilteredData.filter(item => item.location.state === filters.state)
        }

        newFilteredData = newFilteredData.filter(item => {
            let fullName = item.name.first + " " + item.name.last
            fullName = fullName.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

            const normalizedFilter = filters.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

            if(fullName.includes(normalizedFilter)){
                return true
            }
        })
        setFilteredData(newFilteredData)
        setPage(1)
    }, [populationData, filters])

    useEffect(()=>{
        if(populationData.length === 0){
            getPopulationData()
        }else{
            getCurrentPageData()
        }
    }, [seed, page, pageSize, nationality])

    const setInfected = (id: string) => {
        let newInfectedByUser = infectedByUser;
        newInfectedByUser.push({id: id})
        setInfectedByUser(newInfectedByUser)
        const userIndex = populationData.findIndex(item => item.id === id)
        const newInfected = {...populationData[userIndex], infected: true}
        let newPopulationData = [...populationData]
        newPopulationData.splice(userIndex, 1, newInfected)
        console.log(newPopulationData)
        setPopulationData(newPopulationData)
    }
   
    const value = {
        loading: loading,
        currentPageData: currentPageData,
        page: page,
        setPage: setPage,
        pageSize: pageSize,
        setPageSize: setPageSize,
        filters,
        setFilters: setFilters,
        setInfected: setInfected,
        setNationality: setNationality,
        numberOfPages: Math.ceil(filteredData.length / pageSize)
    }
    return <PopulationContext.Provider value={value} >{props.children}</PopulationContext.Provider>
  }

  export {PopulationProvider}