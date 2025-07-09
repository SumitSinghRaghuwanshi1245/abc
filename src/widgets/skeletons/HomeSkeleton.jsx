const Loader = () => {
    return (
      <div className="flex relative h-auto w-full flex-col rounded-lg border bg-[#fbfcfc] p-4 animate-pulse">
        <div className="absolute top-2 left-2 h-5 w-12 bg-gray-300 rounded-sm"></div>
        <div className="relative h-[200px] w-full bg-gray-300 rounded-lg"></div>
        <div className="flex flex-1 flex-col justify-between mt-4 space-y-3">
          <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
          <div className="flex space-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex flex-col space-y-2">
              <div className="h-4 bg-gray-300 rounded-full w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded-full w-1/4"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export const SkeletonLoading = () => {
    return (
      <div className='flex justify-between gap-20 mx-auto my-10   items-center '>
        <Loader />
        <Loader />
        <Loader />
        <Loader />
      </div>
    )
  }
  export const SkeletonLoading2 = () => {
    return (
      <div className='flex justify-between gap-20 mx-auto my-10   items-center '>
        <Loader />
      </div>
    )
  }
  export const SkeletonLoading3 = () => {
    return (
      <div className='flex justify-between gap-20 mx-auto my-10   items-center '>
        <Loader />
      </div>
    )
  }