import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

type characterType = {
    name: string;
    slug: string;
    house:{
        slug: string;
        name: string;
    };
    quotes:[string];
}

const Character = () => {
  const firstRenderRef = useRef(true);
  const [character, setCharacter] = useState<characterType[]>([]);
  const { slug } = useParams<'slug'>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<characterType[]>(`https://game-of-thrones-quotes.herokuapp.com/v1/character/${slug}`)
      .then((res) => {
        setCharacter(res.data);
      });
  }, []);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (character.length === 0) {
      navigate('/404');
    }
  }, [character]);

  return (
    <div className="character--wrapper">
      <div className="character">
        {character.map((char) => (
          <>
            <h1>{char.name}</h1>
            <h2>{char.house.name}</h2>
            <h3>Quotes</h3>
            <p>
              {char.quotes.map((quote) => (
                <>
                  <p>{quote}</p>

                </>
              ))}
            </p>
          </>
        ))}
        <Link className="link--back" to="/">{'<< Go Back'}</Link>
      </div>
    </div>
  );
};

export default Character;
