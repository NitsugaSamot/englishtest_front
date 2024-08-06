

export const setUserName = (name: string) => ({
    type: 'SET_USER_NAME',
    payload: name,
  } as const); 
  
  export type UserActionTypes = ReturnType<typeof setUserName>;
  