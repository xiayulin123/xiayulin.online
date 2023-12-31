import React, { useEffect } from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { styles } from '../styles'
import { github } from '../assets'
import { SectionWrapper } from '../hoc'
import { projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full">
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, '_blank')}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}
const Works = () => {
  const [selectedType, setSelectedType] = useState(null);
  
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    let newFilteredProjects;

    if (selectedType) {
      newFilteredProjects = projects.filter(project => project.type === selectedType);
    } else {
      newFilteredProjects = projects;
    }

    setFilteredProjects(newFilteredProjects);
  }, [selectedType]);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          My portfolio showcases my skills and experience through real-world
          projects, demonstrating my ability to solve complex problems, work
          with diverse technologies, and effectively manage projects. Each
          project is accompanied by a brief description, along with links to the
          corresponding code repositories and live demos. This collection serves
          as a testament to my practical expertise and highlights my capability
          to deliver high-quality solutions.
        </motion.p>
      </div>
      <div className="mt-10 flex gap-6">
        <button
          className={`bg-slate-800 hover:bg-slate-500 text-white px-4 py-2 rounded ${
            selectedType === 'AI' ? 'bg-slate-500' : ''
          }`}
          onClick={() => setSelectedType('AI')}>
          AI
        </button>
        <button
          className={`bg-slate-800 hover:bg-slate-500 text-white px-4 py-2 rounded ${
            selectedType === 'CI/CD' ? 'bg-slate-500' : ''
          }`}
          onClick={() => setSelectedType('CI/CD')}>
          CI/CD
        </button>
        <button
          className={`bg-slate-800 hover:bg-slate-500 text-white px-4 py-2 rounded ${
            selectedType === 'Fullstack' ? 'bg-slate-500' : ''
          }`}
          onClick={() => setSelectedType('Fullstack')}>
          Full Stack
        </button>
      </div>
      <div className="mt-20 flex flex-wrap gap-7">
        {/* {filteredProjects.length === 0 ? (
          <p>No projects of this type.</p>
        ) : (
          filteredProjects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))
        )} */}
        {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        
      </div>
    </>
  )
}

export default SectionWrapper(Works, '')
