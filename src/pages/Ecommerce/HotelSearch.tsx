import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { City, Country, State } from 'react-country-state-city/dist/esm/types';
import { GetCity, GetCountries, GetState } from 'react-country-state-city';
import useForm from '../../hooks/useForm';
import { SearchParams } from '../../types/searchParams';
import { useDispatch } from 'react-redux';
import { updateSearchParams } from '../../redux/reservationSlice';
import { useNavigate } from 'react-router-dom';
import { format, parseISO, subDays } from 'date-fns';

const HotelSearch = () => {
    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // use states
    const [countriesList, setCountriesList] = useState<Country[]>([]);
    const [stateList, setStateList] = useState<State[]>([]);
    const [cityList, setCityList] = useState<City[]>([]);

    // Constants
    const { form: searchForm, setForm: setSearchForm } = useForm<SearchParams>({} as any);

    /* Functions */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateSearchParams(searchForm))
        navigate('/rooms/results')
    };
    
    useEffect(() => {
        GetCountries().then((result) => {
            setCountriesList(result as Country[]);
        });
    }, []);
    useEffect(() => {
        if (searchForm?.country?.id)
            GetState(searchForm?.country?.id).then((result) => {
                setStateList(result as State[]);
            });
    }, [searchForm?.country]);
    useEffect(() => {
        if (searchForm?.country?.id && searchForm?.state?.id)
            GetCity(searchForm?.country?.id, searchForm?.state?.id).then((result) => {
                setCityList(result as City[]);
            });
    }, [searchForm?.state]);
    const excludeDates = useMemo(() => {
        if (!searchForm?.checkInDate) return [];
    
        const checkInDate = parseISO(searchForm.checkInDate);
        const pastDates = Array.from({ length: 365 }, (_, i) => subDays(checkInDate, i + 1));
    
        return [checkInDate, ...pastDates];
    }, [searchForm?.checkInDate]);
    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Search Hotels</h2>
                <div onSubmit={handleSubmit} className="space-y-4">
                    <div className='w-full'>
                        <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">
                            Check-in Date
                        </label>
                        <DatePicker
                            wrapperClassName={"w-full"}
                            selected={searchForm?.checkInDate ? parseISO(searchForm.checkInDate) : null}
                            onChange={(newValue) => {
                                if (newValue) {
                                    const formattedDate = format(newValue, 'yyyy-MM-dd');
                                    setSearchForm((prev) => ({
                                        ...prev, 
                                        checkInDate: formattedDate,
                                        checkOutDate: undefined
                                    }));
                                }
                            }}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className='w-full text-black'>
                        <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">
                            Check-out Date
                        </label>
                        <DatePicker
                            disabled={!searchForm?.checkInDate}
                            wrapperClassName={"w-full"}
                            selected={searchForm?.checkOutDate ? parseISO(searchForm.checkOutDate) : null}
                            onChange={(newValue) => {
                                if (newValue && searchForm?.checkInDate && newValue > parseISO(searchForm.checkInDate)) {
                                    const formattedDate = format(newValue, 'yyyy-MM-dd');
                                    setSearchForm({ ...searchForm, checkOutDate: formattedDate });
                                }
                            }}
                            excludeDates={excludeDates}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div>
                        {/* <label className="mb-2.5 block text-black">
                            Guests 
                        </label> */}
                        <label htmlFor="guests" className="block text-black mb-2.5">
                            Guests
                        </label>
                        <input
                            type="number"
                            id="guests"
                            value={searchForm?.guests ?? 1}
                            onChange={(e) => setSearchForm({ guests: Number(e.target.value) })}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                        />
                    </div>
                    {countriesList.length > 0 &&
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Country
                            </label>
                            <Select
                                options={countriesList.map((country) => ({ value: country.id, label: country.name }))}
                                onChange={(country) => {
                                    if (country) {
                                        setSearchForm(
                                            (prev) => ({
                                                ...prev,
                                                country: { name: country.label, id: country.value },
                                                state: undefined,
                                                city: undefined,
                                            })
                                        );
                                    }

                                }}
                            />
                        </div>}
                    {searchForm?.country?.id && stateList.length > 0 &&
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                State
                            </label>
                            <Select
                                options={stateList.map((state) => ({ value: state.id, label: state.name }))}
                                onChange={(state) => {
                                    if (state) {
                                        setSearchForm(
                                            (prev) => ({
                                                ...prev,
                                                state: { name: state.label, id: state.value },
                                                city: undefined,
                                            })
                                        );
                                    }
                                }}
                            />
                        </div>
                    }
                    {
                        searchForm?.state?.id && cityList.length > 0 &&
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                City
                            </label>
                            <Select
                                options={cityList.map((city) => ({ value: city.id, label: city.name }))}
                                onChange={(city) => {
                                    if (city) {
                                        setSearchForm(
                                            (prev) => ({
                                                ...prev,
                                                city: { name: city.label, id: city.value },
                                            })
                                        );
                                    }
                                }}
                            />
                        </div>
                    }
                    <button
                        onClick={handleSubmit}
                        disabled={ 
                            !searchForm?.checkInDate || !searchForm?.checkOutDate
                        }
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelSearch;