import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import PhotoGrid from '../components/PhotoGrid';
import BlogItem from '../components/BlogItem';

const headerImg = document.querySelector('.home-header__image');
const headerName = document.querySelector('.header-name');

export const IndexPageTemplate = ({
  image,
  title1,
  title2,
  title3,
  title4,
  title5,
  subtitle,
  heading,
  mainpitch,
  bigimage,
  description,
  intro,
  post
}) => (
  <div>
    <div
      className="home-header">
      <div className="home-header__inner">
        <h1
          className="home-header__title">
          {title1} <span className="home-header__accent header-name">{title2}</span>. {title3} <span className="home-header__accent-color">{title4}</span>. {title5}
        </h1>
        <h5
          className="home-header__subtitile"
          >
          {subtitle}
        </h5>
      </div>
      <div className="home-header__icons">
      <img className="home-header__image" src={bigimage.image.publicURL} alt={bigimage.alt} />
      </div>
    </div>

    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                
                <section className="section">
                  <div className="container has-text-centered">
                    <div className="block">
                      {/* <img className="header-img" src={bigimage.image.publicURL} alt={bigimage.alt} /> */}
                    </div>
                    
                    <PhotoGrid gridItems={intro.blurbs} />
                    
                    <h4 className="title is-spaced is-4">{intro.heading}</h4>
                    <p className="subtitle">{intro.description}</p>
                  </div>
                </section>
                
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div>
                <div className="column is-12">
                  <BlogItem post={post} columnWidth="is-12" />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title1: PropTypes.string,
  title2: PropTypes.string,
  title3: PropTypes.string,
  title4: PropTypes.string,
  title5: PropTypes.string,
  subtitle: PropTypes.string,
  heading: PropTypes.string,
  mainpitch: PropTypes.object,
  bigimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  post: PropTypes.object
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  console.log(headerImg)
  if(headerImg !== null) {
    headerImg.style.display = 'none'
  }

  if(headerName !== null){
    headerName.addEventListener("mouseover", function( event ) {   
    headerImg.style.display = 'block'
    }, false);

    headerName.addEventListener("mouseleave", function( event ) {   
    headerImg.style.display = 'none'
    }, false);

    headerImg.addEventListener("mouseover", function( event ) {   
    headerImg.style.display = 'block'
    }, false);

    headerImg.addEventListener("mouseleave", function( event ) {   
    headerImg.style.display = 'none'
    }, false);
  }

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title1={frontmatter.title1}
        title2={frontmatter.title2}
        title3={frontmatter.title3}
        title4={frontmatter.title4}
        title5={frontmatter.title5}
        subtitle={frontmatter.subtitle}
        heading={frontmatter.heading}
        mainpitch={frontmatter.mainpitch}
        bigimage={frontmatter.bigimage}
        description={frontmatter.description}
        intro={frontmatter.intro}
        post={data.allMarkdownRemark.edges[0].node}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title1
        title2
        title3
        title4
        title5
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        mainpitch {
          title
          description
        }
        bigimage {
         image {
            childImageSharp {
              fluid(maxWidth: 240, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
          }
          alt
        }
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___featuredpost, frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 1
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
