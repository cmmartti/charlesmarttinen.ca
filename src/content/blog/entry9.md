---
slug: '2018-11-26-some-code'
title: A Case Study containing some code
datePublished: 2018-11-16T02:26:30.084Z
dateUpdated: 2018-11-16T02:26:30.084Z
image: /images/flower.jpg
tags:
  - test
  - code
  - tag
excerpt: |
    An excerpt is a stand-in for the full article if the article is too long. It may contain multiple paragraphs, as well as **markdown** _formatting_. If the excerpt is empty, the body will be used instead. Excerpts should usually not inline contain images, but may in certain circumstances.

    Four score and seven years ago... 
---

For example, see this piece of code in action:

```jsx{7,8,9,10,11,12,15,27}{numberLines: true}
import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/Layout';

export default function Template({data, location}) {
    const {markdownRemark} = data;
    const {frontmatter, html} = markdownRemark;

    return (
        <Layout location={location}>
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div dangerouslySetInnerHTML={{__html: html}} />
        </Layout>
    );
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: {path: {eq: $path}}) {
            html
            frontmatter {
                date(formatString: "YYYY-MM-DD")
                path
                title
            }
        }
    }
`;
```

As you can see the `<Template />` components renders a page for a given path.

## Update

Editing this entry with Netlify CMS to see if it works.

```python{numberLines: true}{1-2}
def do_something(number1, number2):
    return number1 + number2

print(do_something(1, 2))
```