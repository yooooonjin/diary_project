export const emailCheck = (email) => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!regExp.test(email)) {
    return '이메일 형식으로 입력해주세요.';
  }
};

export const passwordCheck = (password) => {
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  if (!regExp.test(password)) {
    return '8 ~ 16자 영문, 숫자 조합으로 입력해주세요.';
  }
};

export const nameCheck = (name) => {
  const regExp = /^[가-힣]{2,5}$/;
  if (!regExp.test(name)) {
    return '한글 2~5자로 입력해주세요.';
  }
};
