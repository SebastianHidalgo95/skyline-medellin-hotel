import { useNavigate, useParams } from 'react-router-dom';
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { City, Country, State } from 'react-country-state-city/dist/esm/types';
import { useDispatch, useSelector } from 'react-redux';
import { addHotel, updateHotel } from '../../redux/hotelsSlice';
import useForm from '../../hooks/useForm';
import { Hotel } from '../../types/hotel';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import SimpleButton from '../../components/Buttons/SimpleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CreateHotel = () => {
    // Hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get the id from the url
    const { hotelId } = useParams<{ hotelId: string }>();
    const hotelUpdate = useSelector((state: RootState) => state.hotels.hotels.find((hotel: Hotel) => hotel.id === hotelId));

    // states
    const [countriesList, setCountriesList] = useState<Country[]>([]);
    const [stateList, setStateList] = useState<State[]>([]);
    const [cityList, setCityList] = useState<City[]>([]);
    // form values
    const initialValues: Hotel = hotelUpdate ? hotelUpdate : {
        id: '',
        name: '',
        email: '',
        country: {} as { name: string, id: number },
        state: {} as State,
        city: {} as City,
        address: '',
        status: 'enabled',
    };
    const { form: hotelForm, setForm } = useForm<Hotel>({ initialValues });
    /* Functions */
    const handleSubmitHotel = () => {
        const id = hotelId ?? Date.now().toString();
        hotelId
            ? dispatch(updateHotel(hotelForm))
            : dispatch(addHotel({
                ...hotelForm,
                id,
            }));
        navigate(`/hotels/details/${id}`);
    };

    useEffect(() => {
        GetCountries().then((result) => {
            setCountriesList(result as Country[]);
        });
    }, []);

    useEffect(() => {
        if (hotelForm?.country?.id)
            GetState(hotelForm?.country?.id).then((result) => {
                setStateList(result as State[]);
            });
    }, [hotelForm?.country]);
    useEffect(() => {
        if (hotelForm?.country?.id && hotelForm?.state?.id)
            GetCity(hotelForm?.country?.id, hotelForm?.state?.id).then((result) => {
                setCityList(result as City[]);
            });
    }, [hotelForm?.state]);
    return (
        <div>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default">
                    <div className="border-b border-stroke py-4 px-6.5 ">
                        <h3 className="font-medium text-black text-center">
                            {hotelId ? 'Hotel Edition' : 'Hotel Creation'}
                        </h3>
                        <div className="flex">
                            <SimpleButton onClick={() => navigate(-1)}>
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                Back
                            </SimpleButton>
                        </div>
                    </div>
                    <div >
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Hotel Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        onChange={(e) => setForm({ name: e.target.value })}
                                        value={hotelForm?.name}
                                    />
                                </div>
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => setForm({ email: e.target.value })}
                                    value={hotelForm?.email}
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Contact
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter hotel contact number"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => setForm({ phone: e.target.value })}
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
                                                setForm(
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
                            {hotelForm?.country?.id && stateList.length > 0 &&
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        State
                                    </label>
                                    <Select
                                        options={stateList.map((state) => ({ value: state.id, label: state.name }))}
                                        onChange={(state) => {
                                            if (state) {
                                                setForm(
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
                                hotelForm?.state?.id && cityList.length > 0 &&
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        City
                                    </label>
                                    <Select
                                        options={cityList.map((city) => ({ value: city.id, label: city.name }))}
                                        onChange={(city) => {
                                            if (city) {
                                                setForm(
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
                            <div className="mb-6">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    rows={6}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>
                            <div className='flex justify-center'>
                                <SimpleButton onClick={handleSubmitHotel}> 
                                    {hotelId ? 'Update' : 'Create'}
                                </SimpleButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateHotel;