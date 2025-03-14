import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const vcMessageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create VC Message 
    createVCMessage: build.mutation({
      query: (data) => ({
        url: '/vc-message/create-vc-message',
        method: 'POST',
        contentType : 'application/json',
        data,  // Don't stringify, send the data as an object
        
      }),
      invalidatesTags: [tagTypes.vcMessage],
    }),

    // Get VC Message
    getVCMessage: build.query({
      query: () => ({
        url: '/vc-message/get-vc-message',
        method: 'GET',
      }),
      providesTags: [tagTypes.vcMessage],
    }),

    // Update VC Message
    updateVCMessage: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/vc-message/update-vc-message/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [tagTypes.vcMessage],
    }),

    // Delete VC Message
    deleteVCMessage: build.mutation({
      query: (id) => ({
        url: `/vc-message/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.vcMessage],
    }),
  }),
});

export const {
  useCreateVCMessageMutation,
  useGetVCMessageQuery,
  useUpdateVCMessageMutation,
  useDeleteVCMessageMutation,
} = vcMessageApi;
