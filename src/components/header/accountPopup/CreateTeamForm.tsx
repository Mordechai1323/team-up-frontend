import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

import Modal from '../../UI/Modal/Modal';
import InputProject from '../../UI/inputProject';
import Button from '../../UI/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import useAuth from '../../../hooks/useAuth';

interface CreateTeamFormProps {
  onClose: () => void;
  getBoards: () => Promise<void>;
}

const CreateTeamForm = ({ getBoards, onClose }: CreateTeamFormProps) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const { auth, setAuth } = useAuth();

  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNameErr(event.target.value.length > 1 ? '' : 'Enter valid name(min 2 letters)');
    setName(event.target.value);
  };

  const onChangeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
    const err = event.target.value.trim().match(regex) || event.target.value.length === 0 ? '' : 'Enter valid email';
    setEmailErr(err);
    setEmail(event.target.value);
  };

  const onBlurHandler = (event: FormEvent) => {
    event.preventDefault();
    if (emailErr === '' && email.length > 0) {
      setTeamMembers((prevState: string[]) => {
        return [...prevState, email];
      });
      setEmail('');
    }
  };

  const deleteTeamMemberHandler = (email: string) => {
    setTeamMembers((prevState) => {
      return prevState.filter((teamMember) => teamMember !== email);
    });
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const isErr = nameErr !== '' || emailErr !== '';
    if (!isErr) {
      const formDate = { name, team_members: teamMembers };
      try {
        const response = await axiosPrivate.post(`/teams`, formDate, {
          signal: controller.signal,
        });
        setAuth({
          name: response.data.name,
          accessToken: response.data.accessToken,
          role: 'team_leader',
        });
      } catch (err: any) {
        console.log('server error', err.response.data);
        setEmailErr(err.response.data.err);
      }
    }
  };

  useEffect(() => {
    if (auth.role === 'team_leader') {
      getBoards();
      onClose();
    }
  }, [auth]);

  return (
    <Modal onClose={onClose}>
      <CreateTeamFormStyle onSubmit={onSubmitHandler} onKeyDown={(event) => event.key === 'Enter' && onBlurHandler(event)}>
        <div className='icon'>
          <i onClick={onClose} className='fa-solid fa-xmark'></i>
        </div>
        <h2>Create Team</h2>
        <InputProject label={'Team Name'} type={'text'} onChange={onChangeHandler} errMessage={nameErr} />
        <InputProject
          label={'Teams Members'}
          type={'email'}
          value={email}
          onChange={onChangeEmailHandler}
          onBlur={onBlurHandler}
          errMessage={emailErr}
        />
        <ul>
          {teamMembers.map((teamMember) => (
            <li key={teamMember}>
              <span>{teamMember}</span>
              <i className='fa-solid fa-xmark' onClick={() => deleteTeamMemberHandler(teamMember)}></i>
            </li>
          ))}
        </ul>

        <div className='buttons'>
          <Button onClick={onClose} text='Cancel' width='20%' background='#222831' />
          <Button text='Create' width='25%' background='#FD7014' />
        </div>
      </CreateTeamFormStyle>
    </Modal>
  );
};

export default CreateTeamForm;

const CreateTeamFormStyle = styled.form`
  width: 80%;
  height: 45vh;
  color: #eeeeee;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & .icon {
    width: 100%;
    display: flex;
    justify-content: right;
    cursor: pointer;
    & i {
      font-size: 1.5em;
    }
  }
  & h2 {
    width: 100%;
    text-align: center;
    margin: 0;
  }
  & div {
    margin: 0;
    & input {
      /* width: 40%; */
    }
  }
  & ul {
    width: 55%;
    list-style: none;
    padding: 0;
    & li {
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        background: #d5d8df40;
      }
      & i {
        cursor: pointer;
      }
    }
  }
  & .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
  }

  @media (max-width: 1300px) {
    & h2 {
      margin-bottom: 12px;
    }
    & div {
      margin: 16px 0;
    }
  }
`;
