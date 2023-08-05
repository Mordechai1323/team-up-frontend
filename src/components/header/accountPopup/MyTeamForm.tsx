import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

import Modal from '../../UI/Modal/Modal';
import InputProject from '../../UI/inputProject';
import Button from '../../UI/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Loading';

interface MyTeamFormProps {
  onClose: () => void;
  getBoards: () => Promise<void>;
}
interface ITeamMember {
  date_created: string;
  email: string;
  name: string;
  role: string;
  _id: string;
}
interface ITeam {
  team_leader_id: string;
  name: string;
  team_members: string[];
}

const MyTeamForm = ({ onClose, getBoards }: MyTeamFormProps) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const { auth, setAuth } = useAuth();

  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  const [team, setTeam] = useState<ITeam>();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const getMyTeamHandler = async () => {
    try {
      const response = await axiosPrivate.get('/teams/', {
        signal: controller.signal,
      });
      setTeamMembers(response.data.teamMembers);
      setTeam(response.data.team);
      setIsLoading(false);
    } catch (err: any) {
      console.log('server error', err.response.data);
    }
  };

  useEffect(() => {
    getMyTeamHandler();
  }, []);

  const onChangeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
    const err = event.target.value.trim().match(regex) || event.target.value.length === 0 ? '' : 'Enter valid email';
    setEmailErr(err);
    setEmail(event.target.value);
  };

  const deleteTeam = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.delete(`/teams/`, {
        signal: controller.signal,
      });
      setAuth({
        name: response.data.name,
        accessToken: response.data.accessToken,
        role: 'user',
      });
    } catch (err: any) {
      console.log('server error', err.response.data);
      setEmailErr(err.response.data);
    }
  };

  useEffect(() => {
    if (auth.role === 'user') {
      getBoards();
      onClose();
    }
  }, [auth]);

  const addTeamMemberHandler = async (event: FormEvent) => {
    event.preventDefault();
    const isErr = emailErr !== '';
    if (!isErr && email.length > 0) {
      const formDate = { team_member: email };
      setEmail('');
      try {
        const response = await axiosPrivate.post(`/teams/addTeamMember`, formDate, {
          signal: controller.signal,
        });
        console.log(response.data);
        getMyTeamHandler();
        getBoards();
      } catch (err: any) {
        console.log('server error', err.response.data);
        setEmailErr(err.response.data);
      }
    }
  };

  const deleteTeamMemberHandler = async (email: string) => {
    const formDate = { team_member: email };
    try {
      const response = await axiosPrivate.post(`/teams/removeTeamMember`, formDate, {
        signal: controller.signal,
      });
      console.log(response.data);
      getMyTeamHandler();
      getBoards();
    } catch (err: any) {
      console.log('server error', err.response.data);
    }
  };

  return (
    <Modal onClose={onClose}>
      {isLoading ? (
        <Loading height='25vh' width='35vw' />
      ) : (
        <MyTeamFormStyle onSubmit={deleteTeam} onKeyDown={(event) => event.key === 'Enter' && addTeamMemberHandler(event)}>
          <div className='icon'>
            <i onClick={onClose} className='fa-solid fa-xmark'></i>
          </div>
          <h2>{team?.name} Team</h2>
          <InputProject
            label={'Add Teams Members'}
            type={'email'}
            value={email}
            onChange={onChangeEmailHandler}
            onBlur={addTeamMemberHandler}
            errMessage={emailErr}
          />
          <ul>
            {teamMembers?.map((teamMember) => (
              <li key={teamMember._id}>
                <span>{teamMember.email}</span>
                <i className='fa-solid fa-xmark' onClick={() => deleteTeamMemberHandler(teamMember.email)}></i>
              </li>
            ))}
          </ul>

          <div className='buttons'>
            <Button onClick={onClose} text='Cancel' width='20%' background='#222831' />
            <Button text='Delete Team' width='25%' background='rgb(251, 29, 62)' />
          </div>
        </MyTeamFormStyle>
      )}
    </Modal>
  );
};

export default MyTeamForm;

const MyTeamFormStyle = styled.form`
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
    & div {
      margin: 24px 0;
    }
  }
`;
