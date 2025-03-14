import { ICareer } from "@/types/career";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const CAREER_URL = '/career';

interface CareerData {
  title: string;
  date: string;
  documentsUrl: string;
}

 const careerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create career
    createCareer: build.mutation({
      query: (data) => {
        console.log('Creating career with data:', data);
        return {
          url: '/career/create-career',
          method: 'POST', 
          contentType : 'application/json',
          data:data,  // Don't stringify, send the data as an object
          
        };
      },
      invalidatesTags: [tagTypes.career],
    }),

    // Get all careers
    getAllCareers: build.query<ICareer[], void>({
      query: () => ({
        url: CAREER_URL,
        method: 'GET'
      }),
      providesTags: [tagTypes.career]
    }),

    // Get career by id
    getCareerById: build.query<ICareer, string>({
      query: (id) => ({
        url: `${CAREER_URL}/${id}`,
        method: 'GET'
      }),
      providesTags: [tagTypes.career]
    }),

    // Update career
    updateCareer: build.mutation({
      query: ({ id, data }) => ({
        url: `/career/${id}`,
        method: 'PATCH',
        contentType : 'application/json',
        data,  // Don't stringify, send the data as an object
      }),
      invalidatesTags: [tagTypes.career],
    }),

    // Delete career
    deleteCareer: build.mutation<ICareer, string>({
      query: (id) => ({
        url: `${CAREER_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [tagTypes.career]
    })
  }),
  overrideExisting: false
});

export const {
  useCreateCareerMutation,
  useGetAllCareersQuery,
  useGetCareerByIdQuery,
  useUpdateCareerMutation,
  useDeleteCareerMutation
} = careerApi; 