import React, { useMemo, useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import axios from 'axios';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { 
    Container, 
    Content, 
    Filters 
} from './styles';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [allData, setAllData] = useState<any[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);
    
    const movimentType = match.params.type;

    const pageData = useMemo(() => {
        if (movimentType === 'entry-balance') {
            return {
                title: 'Entradas',
                lineColor: '#4E41F0',
                apiEndpoints: ['entradas/eventuais/geral', 'entradas/recorrentes/geral'],
            };
        } else {
            return {
                title: 'Saídas',
                lineColor: '#E44C4E',
                apiEndpoints: ['saidas/eventuais/geral', 'saidas/recorrentes/geral'],
            };
        }
    }, [movimentType]);

    const years = useMemo(() => {
        const uniqueYears: number[] = [];
        allData.forEach(item => {
            const date = new Date(item.data);
            const year = date.getFullYear();
            if (!uniqueYears.includes(year)) uniqueYears.push(year);
        });

        return uniqueYears.map(year => ({
            value: year,
            label: year,
        }));
    }, [allData]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => ({
            value: index + 1,
            label: month,
        }));
    }, []);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);
        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected(prev => [...prev, frequency]);
        }
    };

    const handleMonthSelected = (month: string) => {
        const parseMonth = Number(month);
        if (parseMonth >= 1 && parseMonth <= 12) {
            setMonthSelected(parseMonth);
        } else {
            throw new Error('valor de mês inválido. É aceito de 1 a 12.');
        }
    };

    const handleYearSelected = (year: string) => {
        const parseYear = Number(year);
        setYearSelected(parseYear);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseURL = 'http://localhost:8080';
                const requests = pageData.apiEndpoints.map(endpoint =>
                    axios.get(`${baseURL}/${endpoint}/1`) // Substitua '1' pelo ID do usuário correto
                );
                const responses = await Promise.all(requests);
    
                // Combinar os dados recebidos diretamente do array de objetos
                const combinedData = responses.flatMap(response => {
                    if (Array.isArray(response.data)) {
                        return response.data; // Adiciona os objetos diretamente
                    }
                    console.warn('Resposta inesperada:', response);
                    return []; // Ignorar respostas inválidas
                });
    
                setAllData(combinedData); // Armazena todos os dados para o filtro de anos
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };
    
        fetchData();
    }, [pageData]);

    const filteredData = useMemo(() => {
        return allData
            .filter(item => {
                const date = new Date(item.data);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                return (
                    month === monthSelected &&
                    year === yearSelected &&
                    frequencyFilterSelected.includes(item.frequencia.toLowerCase())
                );
            })
            .map(item => ({
                id: uuid(),
                description: item.descricao,
                amountFormatted: formatCurrency(Number(item.valor)),
                frequency: item.frequencia,
                dateFormatted: formatDate(item.data),
                tagColor: item.frequencia.toLowerCase() === 'recorrente' ? '#4E41F0' : '#E44C4E',
            }));
    }, [allData, monthSelected, yearSelected, frequencyFilterSelected]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput 
                    options={months}
                    onChange={e => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />
                <SelectInput 
                    options={years}
                    onChange={e => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent ${
                        frequencyFilterSelected.includes('recorrente') && 'tag-actived'
                    }`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual ${
                        frequencyFilterSelected.includes('eventual') && 'tag-actived'
                    }`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {filteredData.map(item => (
                    <HistoryFinanceCard
                        key={item.id}
                        tagColor={item.tagColor}
                        title={item.description}
                        subtitle={item.dateFormatted}
                        amount={item.amountFormatted}
                    />
                ))}
            </Content>
        </Container>
    );
};

export default List;
