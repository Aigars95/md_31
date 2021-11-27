import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

type houseType ={
  slug: string;
  name: string;
  members:[{
    name: string;
    slug: string
  }]

}

const Houses = () => {
  const [housesNames, setHousesNames] = useState<houseType[]>([]);
  useEffect(() => {
    axios.get('https://game-of-thrones-quotes.herokuapp.com/v1/houses')
      .then((res) => {
        setHousesNames(res.data);
      });
  }, []);
  return (
    <div className="houses--wrapper">
      {housesNames.map((house) => (
        <div className="house">
          <h1>{house.name}</h1>
          <ul>
            {house.members.map((member, index) => (
              <li>
                <Link className="link--member" key={index.toString()} to={`/characters/${member.slug}`}>{member.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Outlet />
    </div>
  );
};

export default Houses;
