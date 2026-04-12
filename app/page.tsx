import { getProfile, getSkills, getExperiences, getProjects, getAbout } from "../src/lib/api";
import Profile from "../src/Components/Pages/Profile/Profile";
import About from "../src/Components/Pages/About/About";
import Stack from "../src/Components/Pages/Stack/Stack";
import Experiance from "../src/Components/Pages/Experiance/Experiance";
import Projects from "../src/Components/Pages/Projects/Projects";
import Contact from "../src/Components/Pages/Contact/Contact";

export default async function Page() {
  const [profile, skills, experiences, projects, about] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperiences(),
    getProjects(),
    getAbout(),
  ]);

  return (
    <div>
      <Profile profile={profile} skills={skills} />
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12 lg:mt-16 ">
      <About about={about} />
      <Stack skills={skills} />       
      </div>
      <Experiance experiences={experiences} />  
      <Projects projects={projects} />  
      <Contact />
    </div>
  );
}
