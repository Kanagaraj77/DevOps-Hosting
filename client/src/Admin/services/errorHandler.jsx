const errorHandler = (response, ToastError, setLoading) => {
    if(response?.status === 409) {
        ToastError(response?.response?.data?.message || "Conflict");
        setLoading(false);
      }
      if(response?.status === 429) {
        ToastError(response?.response?.data || "Too Many Requests please try after some time");
        setLoading(false);
      }
      if(response?.status === 400) {
        ToastError(response?.response?.data?.errors[0] || "Bad Request");
        setLoading(false);
      }
      if(response?.status === 500) {
        ToastError("Something went wrong");
        setLoading(false);
      }
}

export default errorHandler