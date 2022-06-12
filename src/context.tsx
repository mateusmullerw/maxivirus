import React, {createContext, useEffect, useState} from 'react';
import { api } from './api/axios';

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

interface CitizenInfo extends RawCitzenInfo{
    infected: boolean,
}

interface PopulationData {
    [key: string]: CitizenInfo[];
 }

const initialPopulationData: PopulationData = {1: []};

type PopulationContextType={
    populationData: PopulationData,
    editCitzen: Function,
    page: number,
    setPage: Function,
    resultsPerPage: number,
    setResultsPerPage: Function,
    setNationality: Function,
}

const initialValue: PopulationContextType = {
    populationData: {0: []},
    editCitzen: ()=>{},
    page: 1,
    setPage: ()=>{},
    resultsPerPage: 10,
    setResultsPerPage: ()=>{},
    setNationality: ()=>{},
}
export const PopulationContext = createContext<PopulationContextType>(initialValue)

type PopulationProviderProps = {
    children: React.ReactNode,
}
const PopulationProvider = (props: PopulationProviderProps) => {
    const [populationData, setPopulationData] = useState(initialPopulationData)
    const [page, setPage] = useState(initialValue.page)
    const [resultsPerPage, setResultsPerPage] = useState(initialValue.resultsPerPage)
    const [nationality, setNationality] = useState("br")
    const [infectedByUser, setInfectedByUser] = useState<InfectedByUser[]>([])
    
    const seed = "maxihost"

    const mapRawData = (rawData: RawData) => {
        const processedData = rawData.results.map((citzen) => {
            const infected = citzen.location.postcode % 3 > 0 || 
                infectedByUser.find(item => item.id === citzen.email)

            return({...citzen, infected: infected})
        })
        return processedData
    }

    const getPopulationData = () => {
        api.get(`/?seed=${seed}&page=${page}&results=${resultsPerPage}&nat=${nationality}&exc=login,id,timezone,&noinfo`)
        .then((response) =>{ 
            const processedData = mapRawData(response.data)
            console.log({...populationData, [page]: processedData})
            setPopulationData({...populationData, [page]: processedData})})
        .catch((err) => {
          console.error("Something went wrong:" + err);
        });
    }

    useEffect(()=>{
        if(!populationData[page] || populationData[page].length !== resultsPerPage){
            getPopulationData()
        }
    }, [seed, page, resultsPerPage, nationality])
   
    const value = {
        populationData: populationData,
        editCitzen: ()=>(console.log("edit")),
        page: page,
        setPage: setPage,
        resultsPerPage: resultsPerPage,
        setResultsPerPage: setResultsPerPage,
        setNationality: setNationality,
    }
    return <PopulationContext.Provider value={value} >{props.children}</PopulationContext.Provider>
  }

  export {PopulationProvider}