import React from 'react';
import {Link} from 'gatsby';

export default function TagLink({tag}) {
    return (
        <>
            <Link to={`case-studies/tags/${tag}/`}>{tag}</Link>{' '}
        </>
    );
}
