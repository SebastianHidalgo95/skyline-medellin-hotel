import { useNavigate, useParams } from 'react-router-dom';
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {  City, Country, State } from 'react-country-state-city/dist/esm/types';
import { useDispatch, useSelector } from 'react-redux';
import { addHotel, updateHotel } from '../../redux/hotelsSlice';
import useForm from '../../hooks/useForm';
import { Hotel } from '../../types/hotel';
import { RootState } from '../../redux/store';


const CreateHotel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // get the id from the url
    const { hotelId } = useParams<{ hotelId: string }>();
    const hotelUpdate = useSelector((state: RootState) => state.hotels.hotels.find((hotel: Hotel )=> hotel.id === hotelId));
    const initialValues: Hotel = hotelUpdate ? hotelUpdate : {
        id: '',
        name: '',
        email: '',
        country: {} as Country,
        state: {} as State,
        city: {} as City,
        address: '',
        status: '',
    };
    const { form: hotelForm, setForm } = useForm<Hotel>({ initialValues });
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
    return (
        <div>
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            {hotelId ? 'Hotel Edition' : 'Hotel Creation'}
                        </h3>
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
                                        onChange={(e) => setForm({name:e.target.value})}
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
                                    onChange={(e) => setForm({email :e.target.value})}
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
                                    onChange={(e) => setForm({phone :e.target.value})}
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Country
                                </label>
                                <CountrySelect
                                    containerClassName="form-group"
                                    inputClassName=""
                                    onChange={(country) => {
                                        const selectcountry = country as Country;
                                        setForm((prev) => ({
                                            ...prev, 
                                            country: selectcountry,
                                            state: {} as State,
                                            city: {} as City,
                                        }));
                                    }}
                                    defaultValue={hotelForm?.country as any}
                                    placeHolder="Select Country"
                                />
                            </div>
                            { hotelForm?.country?.id &&
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        State
                                    </label>
                                    <StateSelect
                                        countryid={hotelForm?.country?.id ?? 0}
                                        containerClassName="form-group"
                                        inputClassName=""
                                        onChange={(_state) => 
                                            setForm((prev) => ({
                                                ...prev, 
                                                state: _state as State,
                                                city: {} as City,
                                            }))
                                        }
                                        defaultValue={hotelForm?.state as any}
                                        placeHolder="Select State"
                                    />
                                </div>
                            }
                            {
                                // show city select only if state is selected
                                hotelForm?.state?.id &&
                                <div className="mb-4.5 
                                transition-discrete duration-300 ease-in-out"
                                >
                                <label className="mb-2.5 block text-black dark:text-white">
                                    City
                                </label>
                                <CitySelect
                                    countryid={hotelForm?.country?.id ?? -1}
                                    stateid={hotelForm?.state?.id ?? -1}
                                    containerClassName="form-group"
                                    inputClassName=""
                                    onChange={(_city) => setForm({city: _city as City})}
                                    defaultValue={hotelForm?.city as any}
                                    placeHolder="Select City"

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

                            <button onClick={handleSubmitHotel} className="flex w-1/3 mx-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                {hotelId ? 'Update': 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateHotel;